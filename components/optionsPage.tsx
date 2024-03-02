import {
  DndContext,
} from "@dnd-kit/core"

import {
  SortableContext,
} from "@dnd-kit/sortable"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  clearDomains,
  selectDomains,
  swapDomain,
} from "./domainSwapperSlice"

import {
  DomainEditor
} from "./domainEditor"

import { AddDomain } from "./addDomain"

export function OptionsPage() {
  const domains = useSelector(selectDomains)
  const dispatch = useDispatch()

  return (
    <div>
      <AddDomain />

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
