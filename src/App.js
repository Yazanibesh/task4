import React from 'react'
import { Routes } from './routes/Routes'
import { Navigation } from './components/Navigation'
import './shared/global/global.css'

function App() {
	return (
		<Routes>
			<Navigation />
		</Routes>
	)
}

export default App;
