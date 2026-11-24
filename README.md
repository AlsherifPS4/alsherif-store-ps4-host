# Alsherif Store PS4 Host

An Alsherif Store themed browser host for PS4. It detects firmware, selects a configured exploit chain, offers GoldHEN as its only HEN option, and provides payload tools, language choices, themes, and firmware-specific offline caching.

> Firmware ranges describe the host's configured routes, not guaranteed results on every console model. Compatibility can vary by hardware revision. Use only with a console you own and understand the risks of running homebrew payloads.

## Features

- Automatic PS4 firmware detection and exploit-chain selection
- GoldHEN-only activation with firmware-specific version limits
- Payload tools, homebrew installers, Linux loaders, and optional advanced payloads
- Offline AppCache manifests organized by firmware family
- Alsherif Store banner, layouts, themes, and multiple interface languages

## Firmware coverage

The host configures the following exploit-chain ranges:

| Firmware range | Configured chain |
| --- | --- |
| 4.50–5.07 | BPF Double Free |
| 6.70–6.72 | BadHoist |
| 7.00–9.60 | PSFree Lapse (modular or bundled) |
| 9.00–11.02 | CSSFontFace |
| 11.00–12.02 | SlopKit Lapse |
| 12.50–13.00 | SlopKit Netctrl |
| 13.02–13.52 | Relapse |
| 14.00 and 14.02 | SlopKit Afterglow |

GoldHEN availability is separately restricted by the host. The configured GoldHEN launch ranges are **5.05–5.07, 6.70–6.72, 7.00–12.02, 12.50–13.00, 13.02–13.50, 14.00, and 14.02**. Firmware 13.52 is not enabled because this repository does not include the matching GoldHEN v2.4b18.11 payload.

### GoldHEN versions

The default is v2.4b18.14. The host also includes v2.4b18.13, v2.4b18.12, v2.4b18.10, and v2.4b18.6–v2.4b18.9. The selector enforces these limits:

- Firmware 14.02: v2.4b18.14 only
- Firmware 14.00: v2.4b18.13 or v2.4b18.14
- Firmware above 13.00 through 13.50: v2.4b18.12, v2.4b18.13, or v2.4b18.14
- Other supported firmware: the versions allowed by the host's selector

Payload hashes for the v2.4b18.13 and v2.4b18.14 files are recorded in [SHA256SUMS.txt](./SHA256SUMS.txt).

## Use on PS4

1. Open the deployed host URL in the PS4 browser.
2. Allow the firmware-specific cache process to finish on first use. The first cache requires a network connection.
3. Select **Launch GoldHEN** and wait for the status screen to report the result.
4. Use **Update Cache** after a site update if the browser is still loading an older cached copy.

The cache pages are under `includes/caches/`; firmware routing is defined in `includes/js/firmware.js`. The associated AppCache manifests are under `includes/caches/manifest/`. When cached files or their paths change, update the relevant manifests and their version comments so the PS4 browser can refresh its cache.

## Deploy with GitHub Pages

This is a static website. Keep `index.html` at the published site root and publish the repository root from the selected branch in **Settings → Pages**. No server-side build is required for a normal deployment.

For step-by-step publishing instructions, see [DEPLOY-GITHUB-PAGES.txt](./DEPLOY-GITHUB-PAGES.txt). The site can also be served by another static web server.

GitHub Pages uses HTTPS. Some local-network payload delivery or scanning features may be restricted by browser security when the page is opened over HTTPS; GitHub Pages does not provide a local-network backend.

## Development

The site is plain HTML, CSS, and JavaScript. The Babel build updates the legacy-browser version of the jailbreak dispatcher after changes to `includes/js/jailbreak.js`:

```sh
npm ci
npm run build
```

## Source and license

See [SOURCE-AND-LICENSE.md](./SOURCE-AND-LICENSE.md) and [LICENSE](./LICENSE). Keep the original copyright and license notices in source files when modifying or redistributing this project. Bundled payloads and third-party assets may have separate terms; consult their notices before redistribution.

The SlopKit Afterglow implementation credits **well0nez** and **m0zz**. GoldHEN is by **SiSTR0 and the GoldHEN team**. Other source files retain their own contributor notices.
