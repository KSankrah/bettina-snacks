import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { StateProvider } from './context/StateProvider'
import { initialState } from './context/initialState'
import reducer from './context/reducer'

import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer} >     
			<App />
        </StateProvider>
	</Router>
)
