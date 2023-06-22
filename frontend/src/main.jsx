// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
root.classList.add('flex', 'items-center', 'justify-center', 'h-screen', 'w-full');


ReactDOM.createRoot(root).render(
  <App />
)
