import { createSlice } from '@reduxjs/toolkit'

export const hostsSlice = createSlice({
  name: 'hosts',
  initialState: {
    hosts: []
  },
  reducers: {
    addHost: (state, action) => {
      state.hosts.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addHost } = hostsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectHosts = (state) => state.hosts;

export default hostsSlice.reducer;
