/**
 * This is the template for the Options (Settings) page.
 */
import { Provider } from "react-redux"
import Logo from "react:~assets/icon.svg"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import { ClearAllDomains } from "~components/clearAllDomains"
import { OptionsPage } from "~components/optionsPage"
import { persistor, store } from "~store"

import { HelpCircle } from "lucide-react";

import "./styles/style.scss"

function Options() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="options">
          <header className="header">
            <Logo className="logo" />
            <div>
              <h1>Domain Swapper</h1>
            </div>
          </header>
          <OptionsPage />
          <footer className="footer">
            <p>
              <HelpCircle />
              <a href="https://github.com/adamnorwood/domain-swapper">
                More Info / Get Help
              </a>
            </p>
            <ClearAllDomains />
          </footer>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default Options
