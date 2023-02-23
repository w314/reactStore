import React from 'react'
// import useParams to get product id from url
import { useParams, useLocation } from 'react-router-dom'
import ProductInterface from '../ProductInterface'

export default function Product() {
  // to use information store in the state prop
  // of the <NavLink/> node in the parent componenet
  // use useLocation() hook and access data with location.state
  const location = useLocation()
  const product = location.state

  // access id parameter in the url with useParams hook
  const { id } = useParams()

  
  return (
    <>
      <div>Product {id}</div>
      <div>{product.name}</div>
    </>
  )
}
