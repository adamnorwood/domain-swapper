import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { HostsUpdate } from "features/hostsUpdate"
import { persistor, store } from "~store"

function Options() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Domain Swapper</h1>
        <HostsUpdate />
      </PersistGate>
    </Provider>
  )
}

export default Options
