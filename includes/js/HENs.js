// Alsherif Store supports GoldHEN only. Legacy HEN preferences are normalized on load.
var GOLDHEN_VERSIONS = {
    'GHv2.4b18.12': 'goldhen_v2.4b18.12.bin',
    'GHv2.4b18.10': 'goldhen_v2.4b18.10.bin',
    'GHv2.4b18.9':  'goldhen_v2.4b18.9.bin',
    'GHv2.4b18.8':  'goldhen_v2.4b18.8.bin',
    'GHv2.4b18.7':  'goldhen_v2.4b18.7.bin',
    'GHv2.4b18.6':  'goldhen_v2.4b18.6.bin'
};

var GOLDHEN_DEFAULT = 'GHv2.4b18.12';
var HEN_BASE_PATH = './includes/payloads/HEN/';
var DEFAULT_HEN = 'GoldHEN';

// Gate the host at 13.50 because this package does not bundle the v2.4b18.11
// GoldHEN build identified for 13.52. Exploit-chain availability is checked separately.
function isGoldHENFirmwareSupported(fw) {
    var fwNum = parseFloat(fw);
    return !isNaN(fwNum) && fwNum >= 5.05 && fwNum <= 13.50;
}

function GoldHEN() {
    var version = storage.getString('GHVer', GOLDHEN_DEFAULT);
    var filename = GOLDHEN_VERSIONS[version] || GOLDHEN_VERSIONS[GOLDHEN_DEFAULT];
    storage.session.set('payload_path', HEN_BASE_PATH + filename);
}

function chooseHEN() {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    GoldHEN();
}

function setGoldHENVer(value) {
    if (user.ps4Fw > 13.00 && value !== GOLDHEN_DEFAULT) {
        alert(window.lang.unsupportedFirmware + user.ps4Fw);
        var goldHenRadio = document.querySelector('input[name="goldhen"][value="' + GOLDHEN_DEFAULT + '"]');
        if (goldHenRadio) goldHenRadio.checked = true;
        value = GOLDHEN_DEFAULT;
    }
    if (!GOLDHEN_VERSIONS[value]) value = GOLDHEN_DEFAULT;
    storage.set('GHVer', value);
}

function loadGoldHENVer() {
    var goldHenVer = storage.getString('GHVer', GOLDHEN_DEFAULT);
    if (!GOLDHEN_VERSIONS[goldHenVer]) goldHenVer = GOLDHEN_DEFAULT;
    var goldHenRadio = document.querySelector('input[name="goldhen"][value="' + goldHenVer + '"]');
    if (goldHenRadio) goldHenRadio.checked = true;
    storage.set('GHVer', goldHenVer);
}

// Kept for existing HTML event handlers, but any value is normalized to GoldHEN.
function saveJbFlavor(name, value) {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    var otherName = (name === 'hen') ? 'hen2' : 'hen';
    var otherHenRadio = document.querySelector('input[name="' + otherName + '"][value="GoldHEN"]');
    if (otherHenRadio) otherHenRadio.checked = true;
    chooseHEN();
}

function loadJbFlavor() {
    user.currentJbFlavor = DEFAULT_HEN;
    storage.set('jailbreakFlavor', DEFAULT_HEN);
    var henRadio = document.querySelector('input[name="hen"][value="GoldHEN"]');
    var hen2Radio = document.querySelector('input[name="hen2"][value="GoldHEN"]');
    if (henRadio) henRadio.checked = true;
    if (hen2Radio) hen2Radio.checked = true;
}

function updateHenFlavorVisibility(fwVersion) {
    var fwNum = parseFloat(fwVersion);
    if (isNaN(fwNum)) return;
    var hideGoldHEN = !isGoldHENFirmwareSupported(fwNum);
    var initial = document.getElementById('goldhen-label-initial');
    var exploit = document.getElementById('goldhen-label-exploit');
    var versionSelector = document.getElementById('chooseGoldHEN');
    if (initial) toggleVisibility(initial.id, !hideGoldHEN);
    if (exploit) toggleVisibility(exploit.id, !hideGoldHEN);
    if (versionSelector) toggleVisibility(versionSelector.id, !hideGoldHEN);
}
