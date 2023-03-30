import React from 'react'
// import useRef to get quantity input enter by user
import { useRef } from 'react'
// imports for context
import { useContext } from 'react'
// import models
import { OrderItem } from '../models/OrderItem'
import { ProductContext } from '../ProductContext'
// import for styling
import styled from '@emotion/styled'

// props: 
// productId
// inCart to show if parent component is cart
const AddToCart: 
  React.FunctionComponent<({productId: number, inCart: boolean})>
 = ({productId, inCart}) => {
   
  let quantity = 0
  const { state, dispatch } = useContext(ProductContext)
  // text on from submit button
  const buttonText = inCart ? 'Update Quantity' : 'Add To Cart'
  const deleteButtonVisibility = inCart ? 'visible' : 'hidden'

  // if component child of cart component set quantity to current quantity in cart
  if(inCart) {
    const cart = state.cart?.items
    const quantityInCart = cart?.filter(item => item.productId = productId)[0].quantity
    quantity = quantityInCart ? quantityInCart : 0
  }
  
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
      dispatch({type:"editCart", payload:{productId: productId, quantity: quantity}})
      // reset quantityi in productList
      if(!inCart){
        quantityInput.current.value = '0'
      }
    }
  }

  
  // STYLED COMPONENTS
  const DeleteButton = styled.button`
    visibility: ${inCart ? 'visible' : 'hidden'}
  `

  console.log(`RENDERING AddToCart`)
  return (
    // set onSubmit event to submitForm method
    <form onSubmit={submitForm}>
      <input type="number"
        name="quantity" 
        id="quantity" 
        // use ref property to connect input field to quantityInput variable
        ref={quantityInput}
        // set default value to quantity variable
        defaultValue={quantity}
      />
      <button type='submit'>{ buttonText }</button>
      <DeleteButton onClick={() => dispatch({type:'editCart', payload:{productId:productId, quantity: quantity}})}>
        Delete
      </DeleteButton>
    </form>
  )
}

export default AddToCart