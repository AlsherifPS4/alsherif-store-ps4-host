// Alsherif Store supports GoldHEN only. Legacy HEN preferences are normalized on load.
var GOLDHEN_VERSIONS = {
    'GHv2.4b18.14': 'goldhen_v2.4b18.14.bin',
    'GHv2.4b18.13': 'goldhen_v2.4b18.13.bin',
    'GHv2.4b18.12': 'goldhen_v2.4b18.12.bin',
    'GHv2.4b18.10': 'goldhen_v2.4b18.10.bin',
    'GHv2.4b18.9':  'goldhen_v2.4b18.9.bin',
    'GHv2.4b18.8':  'goldhen_v2.4b18.8.bin',
    'GHv2.4b18.7':  'goldhen_v2.4b18.7.bin',
    'GHv2.4b18.6':  'goldhen_v2.4b18.6.bin'
};

var GOLDHEN_DEFAULT = 'GHv2.4b18.14';
var HEN_BASE_PATH = './includes/payloads/HEN/';
var DEFAULT_HEN = 'GoldHEN';

// Keep the existing 13.52 restriction: this repository does not bundle v2.4b18.11.
// Add 14.00 and 14.02 only where the supplied GoldHEN builds provide support.
function isGoldHENFirmwareSupported(fw) {
    var fwNum = parseFloat(fw);
    return !isNaN(fwNum) && fwNum >= 5.05 &&
        (fwNum <= 13.50 || fwNum === 14.00 || fwNum === 14.02);
}

function GoldHEN() {
    var version = storage.getString('GHVer', GOLDHEN_DEFAULT);
    if (!isGoldHENVersionAllowed(version)) version = GOLDHEN_DEFAULT;
    var filename = GOLDHEN_VERSIONS[version] || GOLDHEN_VERSIONS[GOLDHEN_DEFAULT];
    storage.session.set('payload_path', HEN_BASE_PATH + filename);
}

function chooseHEN() {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    GoldHEN();
}

function isGoldHENVersionAllowed(version) {
    var fw = parseFloat(user.ps4Fw || getPs4FwVersion());
    if (isNaN(fw)) return !!GOLDHEN_VERSIONS[version];
    if (fw === 14.02) return version === 'GHv2.4b18.14';
    if (fw === 14.00) return version === 'GHv2.4b18.14' || version === 'GHv2.4b18.13';
    if (fw > 13.00) return version === 'GHv2.4b18.14' ||
        version === 'GHv2.4b18.13' || version === 'GHv2.4b18.12';
    return !!GOLDHEN_VERSIONS[version];
}

function setGoldHENVer(value) {
    if (!GOLDHEN_VERSIONS[value] || !isGoldHENVersionAllowed(value)) {
        alert((window.lang && window.lang.unsupportedFirmware
            ? window.lang.unsupportedFirmware : 'Unsupported GoldHEN version for firmware ') + user.ps4Fw);
        value = GOLDHEN_DEFAULT;
        var latest = document.querySelector('input[name="goldhen"][value="' + GOLDHEN_DEFAULT + '"]');
        if (latest) latest.checked = true;
    }
    storage.set('GHVer', value);
}

function loadGoldHENVer() {
    var value = storage.getString('GHVer', GOLDHEN_DEFAULT);
    if (!GOLDHEN_VERSIONS[value] || !isGoldHENVersionAllowed(value)) value = GOLDHEN_DEFAULT;
    var radio = document.querySelector('input[name="goldhen"][value="' + value + '"]');
    if (radio) radio.checked = true;
    storage.set('GHVer', value);
}

// Compatibility shims for old UI event hooks. They always select GoldHEN.
function saveJbFlavor(name, value) {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    var otherName = name === 'hen' ? 'hen2' : 'hen';
    var other = document.querySelector('input[name="' + otherName + '"][value="GoldHEN"]');
    if (other) other.checked = true;
    chooseHEN();
}

function loadJbFlavor() {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    var first = document.querySelector('input[name="hen"][value="GoldHEN"]');
    var second = document.querySelector('input[name="hen2"][value="GoldHEN"]');
    if (first) first.checked = true;
    if (second) second.checked = true;
}

function updateHenFlavorVisibility(fwVersion) {
    var fw = parseFloat(fwVersion);
    if (isNaN(fw)) return;
    var hide = !isGoldHENFirmwareSupported(fw);
    ['goldhen-label-initial', 'goldhen-label-exploit', 'chooseGoldHEN'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) toggleVisibility(id, !hide);
    });
}
