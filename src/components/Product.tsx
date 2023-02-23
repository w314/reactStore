import React from 'react'
// import useParams to get product id from url
import { useParams } from 'react-router-dom'
import ProductInterface from '../ProductInterface'

export default function Product() {
  const { id } = useParams()
  
  return (
    <>
      <div>Product {id}</div>
    </>
  )
}
