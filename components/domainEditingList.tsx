import { useDispatch, useSelector } from "react-redux"
import { DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { DomainEditor } from "./domainEditor"
import { selectDomains, swapDomain } from "./domainSwapperSlice"

export function DomainEditingList() {

    const domains = useSelector(selectDomains)
    const dispatch = useDispatch()

    return (
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
    )

}
