/**
 * Listen for messages from the background script.
 */
browser.runtime.onMessage.addListener((message) => {
    if ('swap' === message.command) {

        const url     = new URL(document.location.href);
        const newHost = new URL('https://' + message.url + '/');

        url.host     = newHost.host;
        url.hostname = newHost.hostname;
        url.port     = newHost.port;

        document.location.href = url.href;
    }
});
