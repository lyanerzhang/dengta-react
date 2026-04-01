import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./assets/css/index.scss"
import "./assets/css/antd.scss"

const rootElement = document.getElementById("dengta")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
