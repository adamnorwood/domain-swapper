import React from "react"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useState, useRef, forwardRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  selectDomains,
  removeDomain,
  updateDomain
} from "./domainSwapperSlice"

export function DomainEditor({ item }) {
  const { id, domain } = item
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id: id })

  // Let's also track when the user is wanting to edit a domain in the list.
  const [domainBeingEdited, setDomainBeingEdited] = useState("")
  const [domainEditInputValue, setDomainEditInputValue] = useState("")

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const dispatch = useDispatch()
  const inputRef = React.useCallback((node) => {
    node?.focus();
  }, []);

  function handleEditClick(inputRef) {
    //inputRef.current.focus()
    console.dir(inputRef.current)
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      {domainBeingEdited === id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(
              updateDomain({
                id: id,
                domain: domainEditInputValue
              })
            )
            setDomainEditInputValue("")
            setDomainBeingEdited("")
          }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter domain…"
            value={domainEditInputValue}
            onChange={(e) => setDomainEditInputValue(e.target.value)}
          />

          <button type="submit" className="button--save">
            Save
          </button>
        </form>
      ) : (
        <div>
          <button
            draggable
            className="button--drag"
            ref={setActivatorNodeRef}
            {...listeners}>
            Drag
          </button>

          {domain}

          <button
            className="button--edit"
            onClick={(e) => {
              setDomainBeingEdited(id)
              setDomainEditInputValue(domain)
              handleEditClick(inputRef)
            }}>
            Edit
          </button>

          <button
            className="button--remove"
            onClick={() => dispatch(removeDomain(id))}>
            Remove
          </button>
        </div>
      )}
    </li>
  )
}
