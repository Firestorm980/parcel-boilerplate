// eslint-disable-next-line no-unused-vars
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line no-unused-vars
import App from './App'

const rootElement = document.getElementById('app')
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
)
