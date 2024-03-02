import { OptionsPage } from "~components/optionsPage"
import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { persistor, store } from "~store"

function Options() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Domain Swapper</h1>
        <OptionsPage />
      </PersistGate>
    </Provider>
  )
}

export default Options
