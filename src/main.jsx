import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteMain from "./routes/RouteMain.jsx"
import "./styles/main.css"
import "./config/firebase.config.js"
import "./config/onRender.start.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteMain />
  </StrictMode>
)
