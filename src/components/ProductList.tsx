import React from 'react'
// import useContext to use context to get products
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'

export default function ProductList() {

  // use object desturcturing 
  // to get products from context
  const { products } = useContext(ProductContext)

  return (
    // if we have products
    products ?
    // return html
    <div>
      {/* display list of products names */}
      <ul>
        {/* to avoid error if products is null */}
        {products.map(product => {
          return (
            // set key for each iteration
            // for this example as name is uniuq it will suffice
            <li key={product.name}>{product.name}</li>
          )
        })}
      </ul>
    </div>
    // if products is [] return null
    : null
  )
}
