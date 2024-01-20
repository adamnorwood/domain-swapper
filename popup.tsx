import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { HostsView } from "~hosts"
import { persistor, store } from "~store"

function IndexPopup() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Domain Swapper</h1>
        <HostsView />
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup
