import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* wrap <App /> into <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
