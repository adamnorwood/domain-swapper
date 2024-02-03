import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid/non-secure"

export const domainsSlice = createSlice({
  name: "domains",
  initialState: {
    domainsList: []
  },
  reducers: {
    addDomain: (state, action) => {
      if (0 === action.payload.trim().length) {
        return {
          ...state
        }
      }

      return {
        ...state,
        domainsList: [
          ...state.domainsList,
          {
            id: nanoid(),
            domain: action.payload
          }
        ]
      }
    },

    removeDomain: (state, action) => {
      return {
        ...state,
        domainsList: state.domainsList.filter(
          (domain) => domain.id !== action.payload
        )
      }
    },

    clearDomains: (state) => {
      return {
        ...state,
        domainsList: []
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addDomain, removeDomain, clearDomains } = domainsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDomains = (state) => state.domains.domainsList

export default domainsSlice.reducer
