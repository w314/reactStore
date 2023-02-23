import React from 'react'
import { useState, useEffect } from 'react'
import ProductInterface from '../ProductInterface'

const ProductList = () => {

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
        return <p>{product.name}</p>
      })}
      Haho
    </>
  )
}

export default ProductList