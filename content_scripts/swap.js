/**
 * Listen for messages from the background script.
 */
browser.runtime.onMessage.addListener((message) => {

    // Use the URL API as a trick to quickly get details about the
    // passed-in hostname (this helps if the value includes the port).
    const newHost = new URL(`https://${message.url}/`);

    // Use the URL API to modify the current page's host and port values.
    const url    = new URL(document.location.href);
    url.host     = newHost.host;
    url.hostname = newHost.hostname;
    url.port     = newHost.port;

    // Redirect the page to the new HREF!
    document.location.href = url.href;

});
