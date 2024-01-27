import React from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  addDomain,
  clearDomains,
  removeDomain,
  selectDomains,
  updateDomainInput
} from "./domainsSlice"

export function DomainSwapper() {
  const domains = useSelector(selectDomains)
  const dispatch = useDispatch()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addDomain())
        }}>
        <input
          type="text"
          placeholder="Enter a domain…"
          onChange={(e) => dispatch(updateDomainInput(e.target.value))}
        />
        <button className="button--add">Add Domain</button>
      </form>

      <button
        className="button--clear"
        onClick={() => dispatch(clearDomains())}>
        Clear All
      </button>

      <ul>
        {domains.map((domain, index) => (
          <li key={index}>
            <span id="{domain.id}">{domain.domain}</span>

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
