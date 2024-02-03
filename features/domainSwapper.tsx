import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  addDomain,
  clearDomains,
  removeDomain,
  selectDomains
} from "./domainsSlice"

export function DomainSwapper() {
  const domains = useSelector(selectDomains)
  const dispatch = useDispatch()

  // For tracking the value that's in the Enter Domain input field,
  // we will use a local component state rather than the Redux store
  // because this value is not shared with other components, but also
  // because the Chrome (and other browsers?) Storage API enforces
  // hard limits on the maximum number of storage saves per minute!
  const [domainInputValue, setDomainInputValue] = useState("")

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addDomain(domainInputValue))
          setDomainInputValue("")
        }}>
        <input
          type="text"
          placeholder="Enter domain…"
          value={domainInputValue}
          onChange={(e) => setDomainInputValue(e.target.value)}
        />
        <button type="submit" className="button--add">
          Add Domain
        </button>
      </form>

      <button
        className="button--clear"
        onClick={() => dispatch(clearDomains())}>
        Clear All
      </button>

      <ul>
        {domains.map((domain) => (
          <li key={domain.id}>
            {domain.domain}

            <button
              className="button--remove"
              onClick={() => dispatch(removeDomain(domain.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
