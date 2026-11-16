# Alsherif Store — PS4 Exploit Host

An Alsherif Store-branded PS4 browser host with firmware detection, exploit-chain selection, **GoldHEN-only** activation, payload tools, firmware-specific offline caching, language selection, and theme settings.

## Firmware coverage in this build

- Existing exploit chains are retained for their original firmware ranges.
- **SlopKit Afterglow** is added for PS4 firmware **14.00 and 14.02**.
- The Afterglow source supplied with the supplied upstream source snapshot also contains a 13.52 kernel table, but this host keeps its existing GoldHEN policy and does not enable 13.52 because the matching v2.4b18.11 payload is not bundled.
- GoldHEN v2.4b18.14 is the default payload. v2.4b18.13 and v2.4b18.12 are selectable where allowed by the host's firmware policy.
- The host does not offer PS4HEN, nexHEN, or another HEN flavor.

**Compatibility note:** The presence of an exploit chain and payload in this repository is not a guarantee of successful execution on every console revision. The new Afterglow path and GoldHEN payloads have not been hardware-tested by this repository's maintainer. Test on a console you own and keep a recovery plan.

## Offline cache

Firmware 14.00 and 14.02 use `includes/caches/cache140x.html` and `includes/caches/manifest/140x.manifest`. The manifest includes the Afterglow modules and the GoldHEN payload files used by this build. If any referenced asset is renamed or moved, regenerate/update the manifest and bump its version comment so PS4 AppCache can refresh.

## Deployment

This repository is a static site and can be deployed with GitHub Pages. Serve the repository root as the site root. For a public GitHub Pages deployment, make sure the Pages source points at the branch/folder containing `index.html`.

## License and acknowledgements

This repository includes modified upstream code and third-party exploit/payload components. The applicable upstream license is retained in `LICENSE`; review the license and source headers before redistribution or public hosting. Alsherif Store branding does not imply ownership of the underlying exploit code or payloads.

The Afterglow implementation is credited in its source to **well0nez** and **m0zz**. The broader host and exploit implementations retain their original contributors' notices. GoldHEN is by **SiSTR0 / the GoldHEN team**. See the individual source files for implementation-specific attribution.
