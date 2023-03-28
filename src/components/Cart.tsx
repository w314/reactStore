import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'

export default function Cart() {

  // use object destructuring 
  // to get state from context  
  const { state } = useContext(ProductContext)
  const cart = state.cart

  return (
    cart ?
    // if cart is not null display items
    <div>
        <ul>
          {cart?.items.map(item => { 
            return (
              <li key="item.productId">
                item: {item.productId} quantity: {item.quantity}
              </li>
            )
          })}
        </ul>
    </div>
    // if cart is null dispaly empty cart message
    : <div>Your Cart is Empty</div>
  )
}
