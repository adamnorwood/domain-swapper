/**
 * This is the template for the Add Domain input component.
 */
import { useState } from "react"
import { useDispatch } from "react-redux"

import { addDomain } from "./domainSwapperSlice"

export function AddDomain() {
  const dispatch = useDispatch()

  // For tracking the value that's in the Enter Domain input field,
  // we will use a local component state rather than the Redux store
  // because this value is not shared with other components, but also
  // because the Chrome (and other browsers?) Storage API enforces
  // hard limits on the maximum number of storage saves per minute!
  const [domainInputValue, setDomainInputValue] = useState("")

  return (
    <form
      className="add-domain"
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(addDomain(domainInputValue))
        setDomainInputValue("")
      }}>
      <label htmlFor="domain-add-input">Drop a domain into your list:</label>
      <div className="add-domain-input-wrapper">
        <input
          id="domain-add-input"
          type="text"
          placeholder="Enter domain…"
          value={domainInputValue}
          onChange={(e) => setDomainInputValue(e.target.value)}
        />
        <button type="submit" className="button--add">
          Add
        </button>
      </div>
    </form>
  )
}
