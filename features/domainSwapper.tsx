import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  addDomain,
  clearDomains,
  removeDomain,
  selectDomains,
  updateDomain
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

  // Let's also track when the user is wanting to edit a domain in the list.
  const [domainBeingEdited, setDomainBeingEdited] = useState("")
  const [domainEditInputValue, setDomainEditInputValue] = useState("")

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
            {domainBeingEdited === domain.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  dispatch(
                    updateDomain({
                      id: domain.id,
                      domain: domainEditInputValue
                    })
                  )
                  setDomainInputValue("")
                  setDomainBeingEdited("")
                }}>
                <input
                  type="text"
                  placeholder="Enter domain…"
                  value={
                    "" !== domainEditInputValue
                      ? domainEditInputValue
                      : domain.domain
                  }
                  onChange={(e) => setDomainEditInputValue(e.target.value)}
                />

                <button type="submit" className="button--save">
                  Save
                </button>
              </form>
            ) : (
              <div>
                {domain.domain}
                <button
                  className="button--edit"
                  onClick={() => {
                    setDomainBeingEdited(domain.id)
                    setDomainEditInputValue(domain.domain)
                  }}>
                  Edit
                </button>

                <button
                  className="button--remove"
                  onClick={() => dispatch(removeDomain(domain.id))}>
                  Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
