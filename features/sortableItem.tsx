import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  selectDomains,
  removeDomain,
  updateDomain
} from "./domainsSlice"

export function SortableItem({ item }) {
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

  const domains = useSelector(selectDomains)
  const dispatch = useDispatch()

  return (
    <li ref={setNodeRef} style={style} {...attributes} draggable>
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
            className="button--drag"
            ref={setActivatorNodeRef}
            {...listeners}>
            Drag
          </button>

          {domain}

          <button
            className="button--edit"
            onClick={() => {
              setDomainBeingEdited(id)
              setDomainEditInputValue(domain)
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
