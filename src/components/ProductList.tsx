import React from 'react'
// import useContext to use context to get products
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'
// import child components
import Product from './Product'
import AddToCart from './AddToCart'

export default function ProductList() {

  // use object desturcturing 
  // to get products from context
  const { state } = useContext(ProductContext)

  // create function to update quantity
  // pass it later to child component to get updated quantity value
  const updateQuantity = (quantity:number) => {
    console.log(`Quantity in ProductList component: ${quantity}`)
  }

  return (
    // if we have products
    state.products ?
    // return html
    <div>
      {/* display list of products names */}
      <ul>
        {/* to avoid error if products is null */}
        {state.products.map(product => {
          return (
            <li key={product.id}>
              {/* set key for each iteration
                for this example as name is uniuq it will suffice
                use child component Product to display product name
                set product property to product to send data to child component */}
                <Product product={product}></Product>
                {/* set updateQuantity prop in child component to updateQuantity 
                  function defined here, this will allow child component
                  to pass data (the updated quantity) to the parent compenent */}
                <AddToCart updateQuantity={updateQuantity}></AddToCart>
            </li>
          )
        })}
      </ul>
    </div>
    // if products is [] return null
    : null
  )
}
