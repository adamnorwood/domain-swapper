import { useDispatch } from "react-redux"

import { clearDomains } from "./domainSwapperSlice"

export function ClearAllDomains() {
  const dispatch = useDispatch()

  return (
    <button className="button--clear" onClick={() => dispatch(clearDomains())}>
      Clear All
    </button>
  )
}
