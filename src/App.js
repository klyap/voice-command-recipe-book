import React from 'react'
import './App.css'
import Recipe from './recipe.js'
import { recipes } from './recipe-db.js'
function App () {
  return (
    <div className="App">
      <Recipe recipe={recipes[0]}/>
    </div>
  )
}

export default App
