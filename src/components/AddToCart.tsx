import React from 'react'
// import useRef to get quantity input enter by user
import { useRef } from 'react'
// import models
import { OrderItem } from '../models/OrderItem'

// props: 
// productId
// editCart function that will handle if we add to the cart
const AddToCart: React.FunctionComponent<({productId: number, editCart:(item: OrderItem) => void})>
 = ({productId, editCart}) => {

  let quantity = 0
  // create reference to quantity input field
  const quantityInput = useRef<HTMLInputElement>(null)

  const submitForm = (event:React.FormEvent) => {
    // call preventDefault() to avoid page rerendering
    event.preventDefault()

    if(quantityInput.current){
      // get quantity entered in input field
      const quantity = parseInt(quantityInput.current.value, 10)
      console.log(`Quantity in child AddToCart after form submission: ${quantity}`)
      // pass data to parent component, by calling the method provided as prop
      editCart({productId: productId, quantity: quantity})
    }
  }

  return (
    // set onSubmit event to submitForm method
    <form onSubmit={submitForm}>
      <input type="number"
        name="quantity" 
        id="quantity" 
        // use ref property to connect input field to quantityInput variable
        ref={quantityInput}
        // set daefault value to quantity variable
        defaultValue={quantity}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddToCart