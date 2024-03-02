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
  addDomain,
  clearDomains,
  removeDomain,
  selectDomains,
  swapDomain,
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

  function SortableItem({ item }) {
    const { id, domain } = item
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      setActivatorNodeRef
    } = useSortable({ id: id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    }

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
              setDomainInputValue("")
              setDomainBeingEdited("")
            }}>
            <input
              type="text"
              placeholder="Enter domain…"
              value={
                "" !== domainEditInputValue ? domainEditInputValue : domain
              }
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

      <DndContext
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const activeIndex = domains.findIndex(({ id }) => id === active.id)
            const overIndex = domains.findIndex(({ id }) => id === over.id)

            dispatch(swapDomain({ activeIndex, overIndex }))
          }
        }}>
        <SortableContext items={domains}>
          <ul>
            {domains.map((domain) => (
              <SortableItem key={domain.id} item={domain} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}
