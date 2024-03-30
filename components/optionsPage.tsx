/**
 * This component is a basic wraper for the child components find on the
 * Options panel (perhaps this should be consolidated with options.tsx instead?)
 */
import { AddDomain } from "./addDomain"
import { DomainEditingList } from "./domainEditingList"

export function OptionsPage() {
  return (
    <div>
      <AddDomain />
      <DomainEditingList />
    </div>
  )
}
