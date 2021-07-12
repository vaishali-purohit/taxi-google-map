import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
import './index.css'
import './darkMode.css'
import './lightMode.css'
import { configureStore } from './store/configureStore'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore({})

dotenv.config()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
