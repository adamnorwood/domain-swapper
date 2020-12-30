# Domain Swapper

A browser plugin that allows you to quickly switch between domain names (hostnames) while keeping intact the rest of your current URL path.

Why would you want to do this? Developers often test specific pages or application paths and need to check things out quickly on an alternate environment (like jumping between a local dev environment and a QA or PROD system) — it's way faster and less intrusive to your workflow if you don't have to manually edit the hostname in the browser location bar!

Currently only Firefox is supported, but other browsers with Web Extension API support will be added soon.

## How to Use

* Once the plugin is installed, its icon will appear in your address bar.
* Click on that icon, then click the Settings (gear) icon to open the Settings panel.
* Use the **+ Add Domain** button to add domain names that you regularly need to switch between. These can include port numbers (e.g. `localhost:3000`), but no need to include protocols or trailing slashes (e.g. just put in `example.com` instead of `https://example.com`).
* Don't forget to hit **Save** to save your new domains!
* Close the Settings panel, and now when you click on the Domain Swapper icon in your address bar you will see your customized list of domain names. Click one of those when you're ready to jump over to that other hostname!
