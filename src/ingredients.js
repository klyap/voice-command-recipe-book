/* eslint-disable react/prop-types */
import React from 'react'
import { Focusable } from './focusable'
import { Header } from './header'
export const Ingredients = ({ ingredients, focusedId, refEl }) => {
  return (
    <>
      <Header>Ingredients</Header>
      <ul>
        {ingredients.map((ingredient, i) => {
          const ingredientName = ingredient.split(' ').pop()
          const key = `ingredient-${ingredientName}`
          return (
            <Focusable key={key} refEl={refEl} isFocused={focusedId === key}>
              <li>{ingredient}</li>
            </Focusable>
          )
        })}
      </ul>
    </>
  )
}
