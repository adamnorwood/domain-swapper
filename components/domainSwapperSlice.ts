/**
 * This contains the React / Redux Toolkit slice and related dispatched actions.
 * @see https://redux-toolkit.js.org/api/createslice
 */
import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid/non-secure"

export const domainSwapperSlice = createSlice({
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

    updateDomain: (state, action) => {
      return {
        ...state,
        domainsList: state.domainsList.map((domain) => {
          if (domain.id === action.payload.id) {
            return {
              ...domain,
              domain: action.payload.domain
            }
          }

          return domain
        })
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

    swapDomain: (state, action) => {
      const index1 = action.payload.activeIndex
      const index2 = action.payload.overIndex
      const results = state.domainsList.slice();
      const item1 = state.domainsList[index1];

      results[index1] = state.domainsList[index2];
      results[index2] = item1;

      return {
        ...state,
        domainsList: results
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
export const {
  addDomain,
  clearDomains,
  removeDomain,
  swapDomain,
  updateDomain
} = domainSwapperSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDomains = (state) => state.domains.domainsList

export default domainSwapperSlice.reducer
