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
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  addDomain,
  clearDomains,
  selectDomains,
  swapDomain,
} from "./domainSwapperSlice"

import {
  DomainEditor
} from "./domainEditor"

export function OptionsPage() {
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
              <DomainEditor key={domain.id} item={domain} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}
