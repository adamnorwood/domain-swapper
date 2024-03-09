import { AddDomain } from "./addDomain"
import { ClearAllDomains } from "./clearAllDomains"
import { DomainEditingList } from "./domainEditingList"

export function OptionsPage() {

  return (
    <div>
      <AddDomain />
      <ClearAllDomains />
      <DomainEditingList />
    </div>
  )
}
