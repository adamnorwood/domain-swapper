import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { DomainsPopup } from "~components/domainsPopup"
import { persistor, store } from "~store"

import "./styles/style.scss"

import { Settings } from "lucide-react"
import Logo from "react:~assets/icon.svg"

function IndexPopup() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="popup">
          <header className="header">
            <Logo className="logo" />
            <div>
              <h1>Domain Swapper</h1>
              <p>Where to next?</p>
            </div>
          </header>
          <DomainsPopup />

          <button
            className="settings"
            onClick={() => chrome.runtime.openOptionsPage()}>
            <Settings /> Settings…
          </button>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup
