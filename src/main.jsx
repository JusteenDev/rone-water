import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from "./routes/Main.jsx"
import "./styles/main.css"
import "./config/firebase.config.js"
import "./config/onRender.start.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
