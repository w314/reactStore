import React from 'react'
import { useState, useEffect } from 'react'
import ProductInterface from '../ProductInterface'
// import Product from './Product'
import { Link } from 'react-router-dom'

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
            <Link to={`/products/${product.id}`}>select</Link>
          </div>
        )
      })}
    </>
  )
}