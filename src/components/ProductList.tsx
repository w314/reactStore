import React from 'react'
// import useContext to use context to get products
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'
// import Product component
import Product from './Product'


export default function ProductList() {

  // use object desturcturing 
  // to get products from context
  const { state } = useContext(ProductContext)

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
            // set key for each iteration
            // for this example as name is uniuq it will suffice
            // use child component (Product) to display product name
            // set product property to product to send data to child component
            <li key={product.name}><Product product={product}></Product></li>
          )
        })}
      </ul>
    </div>
    // if products is [] return null
    : null
  )
}
