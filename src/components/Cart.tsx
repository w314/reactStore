import React from 'react'
// imports for context
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'
// import child components
import AddToCart from './AddToCart'
// import models
import { OrderItem } from '../models/OrderItem'

const Cart: React.FunctionComponent<({editCart: (item:OrderItem) => void}) > = 
  ({editCart}) => {

  // use object destructuring 
  // to get state from context  
  const { state, dispatch } = useContext(ProductContext)
  const cart = state.cart

  console.log(`RENDERING CART`)
  return (
    cart ?
    // if cart is not null display items
    <div>
        <ul>
          {cart?.items.map(item => { 
            return (
              <li key="item.productId">
                item: {item.productId} quantity: {item.quantity}
                <AddToCart 
                  productId={item.productId}
                  inCart={true}
                ></AddToCart>
              </li>
            )
          })}
        </ul>
    </div>
    // if cart is null dispaly empty cart message
    : <div>Your Cart is Empty</div>
  )
}

export default Cart