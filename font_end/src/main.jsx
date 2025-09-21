

import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx' //./pages/login_and_register.jsx'
import App from './admin/index.jsx' //./pages/login_and_register.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)