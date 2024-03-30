import { PaintRoller } from "lucide-react"
import { useDispatch } from "react-redux"

import { clearDomains } from "./domainSwapperSlice"

export function ClearAllDomains() {
  const dispatch = useDispatch()

  return (
    <button className="button--clear" onClick={() => window.confirm( 'Are you sure you want to remove all of your domain and start over?' ) && dispatch(clearDomains())}>
      <PaintRoller /> Start fresh
    </button>
  )
}
