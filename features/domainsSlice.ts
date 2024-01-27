import { createSlice } from "@reduxjs/toolkit"

export const domainsSlice = createSlice({
  name: "domains",
  initialState: {
    domainsList: [],
    domainInput: ""
  },
  reducers: {
    addDomain: (state) => {
      if (0 === state.domainInput.trim().length) {
        return
      }

      state.domainsList.push({
        id: 1,
        domain: state.domainInput
      })
    },

    updateDomainInput: (state, action) => {
      state.domainInput = action.payload
    },

    removeDomain: (state, action) => {
      state.domainsList.splice(action.payload, 1)
    },

    clearDomains: (state) => {
      state.domainsList = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addDomain, updateDomainInput, removeDomain, clearDomains } =
  domainsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDomains = (state) => state.domains.domainsList

export default domainsSlice.reducer
