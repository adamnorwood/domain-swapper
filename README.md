# Domain Swapper

A browser extension that allows you to quickly switch between domain names (hostnames) while keeping intact the rest of your current URL path.

Why would you want to do this? Developers often test specific pages or application paths and need to check things out quickly on an alternate environment (like jumping between a local dev environment and a QA or PROD system or a `localhost` proxy that's on a different port than production) — it’s way faster and less intrusive to your workflow if you don’t have to manually fiddle with the address in the browser location bar!

## How to Use

* Once the extension is installed, its icon will appear in your address bar.
* Click on the Domain Swapper icon, then click the `Settings…` button to open the Settings panel.
* Use the **+ Add Domain** input to add domain names / hostnames that you regularly need to switch between. These can include port numbers (e.g. `localhost:3000`), but shouldn’t include protocols or trailing slashes (e.g. just put in `example.com` instead of `https://example.com`).
* Close the Settings panel, and now when you click on the Domain Swapper icon in your address bar you will see your customized list of domain names. Click one of those when you're needing to jump over to that other address!

## The Fine Print

Extension icon SVG by Noun Project user [rajakumara](https://thenounproject.com/rajakumara12121/), licensed as [Creative Commons CC BY](https://creativecommons.org/licenses/by/4.0/) (modifications made to the icon: cropping to artwork
dimensions, optimization with SVGOMG).

## Release Notes

### [2.0.1](https://github.com/adamnorwood/domain-swapper/compare/v2.0.0...v2.0.1)

* Updates node package versions to latest.
* Removes unnecessary node package references.
* MINOR: tidies up code comments and runs components through `Prettier` one more time.

### [2.0.0](https://github.com/adamnorwood/domain-swapper/compare/v1.1.1...v2.0.0)

* Completely redesigned and rewritten using the [Plasmo](https://github.com/PlasmoHQ/plasmo) web extension framework, with [Redux Toolkit](https://redux-toolkit.js.org/) for persistent storage and [dnd kit](https://dndkit.com/) for the accessible drag-and-drop support.
* Builds are now available through Firefox Add-Ons as well as the Google Chrome Web Store (Edge and Safari versions coming soon…hopefully).
