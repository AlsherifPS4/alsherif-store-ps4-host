# Alsherif Store — PS4 Exploit Host

An Alsherif Store-branded PS4 browser host with firmware detection, supported exploit-chain selection, GoldHEN-only activation, payload tools, firmware-based caching, language selection, and theme settings.

> **Important:** Compatibility is firmware- and payload-specific. A listed exploit chain does not guarantee that every payload or GoldHEN build works on every firmware revision. Test on your own console before relying on a release.

## Features

- PS4 browser and firmware detection.
- Firmware-aware exploit-chain selection for the exploit implementations included in this repository.
- **GoldHEN only:** alternative HEN selection and payloads are removed from the user interface and package.
- GoldHEN version selection for the bundled versions.
- Built-in payload delivery, tools, homebrew, Linux utilities, advanced payloads, and custom payload loading.
- Firmware-specific caching and cache manifests.
- Multiple languages, layouts, color themes, automatic retry, and settings.
- Optional local network discovery and remote payload delivery when hosted with a compatible local server.

## Local testing on Windows

1. Download or clone this repository.
2. Serve the repository root with a local web server; do not open the HTML files as `file://` URLs.
3. Open the server URL on the target device. For local payload delivery, the PC and PS4 must be on the same LAN and the required payload-loader/server support must be running.
4. Before public deployment, check every firmware family you intend to support and verify that its selected GoldHEN build is compatible.

A simple development server can be started from the repository root with Python:

```powershell
py -m http.server 8000
```

Then browse to `http://PC-LAN-IP:8000/` from a device on the same network. A static HTTP server does not itself provide the optional payload-delivery server endpoints; those require the appropriate supporting server.

## License and upstream acknowledgements

This repository contains modified open-source PS4 exploit-host code, exploit implementations, third-party assets, and payloads. The original AGPL-3.0-or-later license is retained in `LICENSE`, and upstream contributors are credited in the About panel and source notes. The Alsherif Store branding and GoldHEN-only modifications do not imply ownership of the underlying third-party work.

When you publish or operate a modified network-hosted version, review the AGPL-3.0-or-later terms and make the corresponding source available as required by the license. See [`SOURCE-AND-LICENSE.md`](SOURCE-AND-LICENSE.md).

## Supported firmware

Exploit-chain coverage is defined in `includes/js/firmware.js`. Individual chains cover different firmware ranges; the displayed range is not a promise that every firmware and bundled payload combination has been tested. The host restricts its supported jailbreak UI to firmware ranges that also pass its GoldHEN availability policy. This package gates GoldHEN activation at firmware 13.50 because it does not include the separate GoldHEN v2.4b18.11 build identified for 13.52 in current community host references. Do not advertise 13.52 support until a compatible build is added and tested.

## Credits

Thanks to the original project contributors and exploit/payload authors, including abc, Al-Azif, anonymous contributors, Dr.Yenyen, Egycnq, Feyzee61, Fire30, Flatz, Jordy, Nathan Fargo, Nazky, qwertyoruiopz, Raw Game, sleirsgoevy, Sonic-Iso, TheFlow, ufm42, and the payload developers. See the existing source files for implementation-specific credits.
