import React from 'react'
// import useContext to use context to get products
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'
// import child components
import Product from './Product'
import AddToCart from './AddToCart'
// import models
import { OrderItem } from '../models/OrderItem'

export default function ProductList() {

  // use object destructuring 
  // to get state and dispatch from context
  const { state, dispatch } = useContext(ProductContext)

  // create function to update cart
  // pass it later to child component to get the quantity value
  const editCart = (item: OrderItem) => {
    console.log(`Quantity in ProductList component: ${item.quantity}`)
    dispatch({type:'editCart', payload: item})
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
                {/* set editCart prop in child component to editCart 
                  function defined here, this will allow child component
                  to pass data (the updated quantity) to the parent compenent 
                  pass productId so that child component can pass it back with the quanitty */}
                <AddToCart editCart={editCart} productId={product.id}></AddToCart>
            </li>
          )
        })}
      </ul>
    </div>
    // if products is [] return null
    : null
  )
}
