const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function swap(tab) {
    const href = tab.url;
    const newURL = (href.includes('.test'))
            ? href.replace('law.utexas.test','localhost:3000')
            : href.replace('localhost:3000','law.utexas.test');

    browser.tabs.update({url: newURL});
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/coffee-48.png"});
    browser.pageAction.setTitle({tabId: tab.id, title: 'SWAP'});
    browser.pageAction.show(tab.id);
  }
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Swap domains when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(swap);
