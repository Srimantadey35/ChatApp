import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/mainStore.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    
  </BrowserRouter>
)
