import React from 'react'
import { useState, useEffect } from 'react'
import ProductInterface from '../models/ProductInterface'
// import Product from './Product'
import { NavLink} from 'react-router-dom'


export default function ProductList() {
  const [products, setProducts] = useState([] as ProductInterface[])
  
  useEffect(() => {
    fetch('./products.JSON')
    .then(response => response.json())
    .then(data =>  setProducts(data))
    .catch(error => {
      throw new Error('bajvan')
    })
  },[])

  console.log(products)
  return (
    <>
      {products.map(product => {
        return (
          <div key={product.id}>
            <p>{product.name}</p>
            // with the state property we send information to the child component
            <NavLink to={`/products/${product.id}`} state={product}>select</NavLink>
          </div>
        )
      })}
    </>
  )
}