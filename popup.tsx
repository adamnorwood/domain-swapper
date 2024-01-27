import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { DomainsView } from "~domains"
import { persistor, store } from "~store"

function IndexPopup() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Domain Swapper</h1>
        <DomainsView />
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup
