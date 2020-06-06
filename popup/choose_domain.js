const hostsContainer = document.getElementById('hosts');

/**
 * Listens for any time the toolbar icon or the popup for this extension is
 * clicked. Handles updating the popup's list of host buttons, as well as
 * sending messages to the browser when one of those host buttons is
 * selected by the user.
 */
function listenForClicks() {

    let getting = browser.storage.local.get("hosts");
    getting.then(updateHostsList, (error) => {
        console.log(`Error: ${error}`);
    });

    const hosts = document.getElementById('hosts');
    hosts.addEventListener('click', (e) => {
        browser.tabs.query({active: true, currentWindow: true})
            .then(function(tabs) {
                browser.tabs.sendMessage(tabs[0].id, {
                    url: e.target.textContent
                });
            });
    });

    const preferencesButton = document.getElementById('preferences-button');
    preferencesButton.addEventListener('click', (e) => {
        browser.runtime.openOptionsPage();
    });
}

/**
 * Runs every time the popup is opened, populating the popup with
 * HTML buttons for each host set in the Settings panel.
 * @param obj result The browser.storage.local object containing hosts from the Settings panel.
 */
function updateHostsList(result) {

    if (result.hosts) {

        // First query for the current tab's information (so we can tell if we
        // are on the "current" hostname) as a Promise. Once that info is
        // available, loop through the list of hosts specified in the Settings
        // panel and add buttons for each of them to the popup.
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            result.hosts.forEach(host => {

                const button = document.createElement('button');
                button.innerText = host;

                if (new URL(tabs[0].url).host == host) {
                    button.classList.add('current');
                }

                hostsContainer.appendChild(button);

            });
        });
    }
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/swap.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
