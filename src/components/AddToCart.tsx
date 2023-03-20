import React from 'react'
// import useRef
import { useRef } from 'react'

// add updateQuantity as prop to be received from parent component
// will be used to pass value from child component to parent
const AddToCart: React.FunctionComponent<({updateQuantity:(quantity:number) => void})>
 = ({updateQuantity}) => {

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
      updateQuantity(quantity)
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