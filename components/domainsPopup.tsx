import { useState } from "react"

import { useAppDispatch, useAppSelector } from "~store"

export const DomainsPopup = () => {
  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector"
  // to automatically get the correct types.
  const domains = useAppSelector((state) => state.domains)

  // For this popup of possible destinations, we don't want to show a
  // domain if it's the one the user is currently already looking at.
  // But since chrome.tabs.query returns a Promise, we'll need to use
  // state to keep track of the current tab's host value.
  const [currentHost, setcurrentHost] = useState({ host: null, protocol: null })

  // As mentioned above, here's that Promise…
  chrome.tabs.query({ active: true, currentWindow: true }).then((tab) => {
    const currentURL = new URL(tab[0].url)
    setcurrentHost({ host: currentURL.host, protocol: currentURL.protocol })
  })

  return ["https:", "http:"].includes(currentHost.protocol) ? (
    domains.domainsList.length > 0 ? (
      <ul>
        {domains.domainsList.map(
          (domain) =>
            currentHost.host !== domain.domain && (
              <li key={domain.id}>
                <button
                  className="domain"
                  onClick={(e) => {
                    chrome.tabs
                      .query({ active: true, currentWindow: true })
                      .then((tab) => {
                        const url = new URL(tab[0].url)
                        const newURL = new URL(`https://${domain.domain}/`)
                        url.host = newURL.host
                        url.hostname = newURL.hostname
                        url.port = newURL.port

                        chrome.tabs.update(undefined, {
                          url: url.href
                        })

                        // Close the popup now that the user has selected a domain.
                        window.close()
                      })
                  }}>
                  {domain.domain}
                </button>
              </li>
            )
        )}
      </ul>
    ) : (
      <p className="getting-started-message">
        To get started, open the Settings panel and add some domains / hostnames! ↓
      </p>
    )
  ) : (
    <div className="wrong-protocol">
      Sorry, you can only swap when you're on a normal (HTTP/HTTPS) page! (you
      are currently on a <code>{currentHost.protocol}</code> page)
    </div>
  )
}
