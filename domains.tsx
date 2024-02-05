import { useAppDispatch, useAppSelector } from "~store"

export const DomainsView = () => {
  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector" to automatically get the correct types
  const domains = useAppSelector((state) => state.domains)

  return (
    <div>
      <ul>
        {domains.domainsList.map((domain) => (
          <li
            key={domain.id}
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
          </li>
        ))}
      </ul>
    </div>
  )
}
