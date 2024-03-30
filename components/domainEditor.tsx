/**
 * This component is for the individual domains on the Settings page, including
 * all of the functionality around Editing, Deleting, and Drag-handling.
 */
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Check, GripVertical, Pencil, Trash2, X } from "lucide-react"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { removeDomain, updateDomain } from "./domainSwapperSlice"

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
    node?.focus()
  }, [])

  return (
    <li className="domain" ref={setNodeRef} style={style} {...attributes}>
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
            className="domain-text"
            ref={inputRef}
            type="text"
            placeholder="Enter domain…"
            value={domainEditInputValue}
            onChange={(e) => setDomainEditInputValue(e.target.value)}
          />

          <button type="submit" className="button--save">
            <Check aria-label="Save this edit" />
          </button>

          <button
            type="button"
            className="button--cancel"
            onClick={(e) => {
              setDomainBeingEdited(null)
              setDomainEditInputValue(null)
            }}>
            <X aria-label="Cancel this edit" />
          </button>
        </form>
      ) : (
        <div>
          <button
            draggable
            className="button--drag"
            ref={setActivatorNodeRef}
            {...listeners}>
            <GripVertical aria-label="Reorder this domain in the list" />
          </button>

          <span className="domain-text">{domain}</span>

          <button
            className="button--edit"
            onClick={(e) => {
              setDomainBeingEdited(id)
              setDomainEditInputValue(domain)
            }}>
            <Pencil aria-label="Edit this domain" />
          </button>

          <button
            className="button--remove"
            onClick={() =>
              window.confirm("Are you sure you want to delete this domain?") &&
              dispatch(removeDomain(id))
            }>
            <Trash2 aria-label="Remove this domain" />
          </button>
        </div>
      )}
    </li>
  )
}
