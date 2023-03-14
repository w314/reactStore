import React from 'react'
import { ProductContext } from '../ProductContext'
import { ProductType } from '../models/ProductType'

// define react funtion component
// add product as prop to be received from parent component
const Product: React.FunctionComponent<{product: ProductType}> =
  ({product}) => (
    <div>{product.name}</div>
  )

export default Product