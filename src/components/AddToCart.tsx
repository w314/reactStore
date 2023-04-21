import React from "react";
// import useRef to get quantity input enter by user
import { useRef } from "react";
// imports for context
import { useContext } from "react";
// import models
import { OrderItem } from "../models/OrderItem";
import { ProductContext } from "../ProductContext";
// import for styling
import styled from "@emotion/styled";

// props:
// productId
// inCart to show if parent component is cart
const AddToCart: React.FunctionComponent<{
  productId: number;
  inCart: boolean;
}> = ({ productId, inCart }) => {
  let quantity = 1;
  const { state, dispatch } = useContext(ProductContext);
  // text on from submit button
  const buttonText = inCart ? "Update Quantity" : "Add To Cart";
  const deleteButtonVisibility = inCart ? "visible" : "hidden";

  // if component child of cart component set quantity to current quantity in cart
  if (inCart) {
    const cart = state.cart?.items;
    const quantityInCart = cart?.filter(
      (item) => (item.productId = productId)
    )[0].quantity;
    quantity = quantityInCart as number;
  }

  // create reference to quantity input field
  const quantityInput = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent) => {
    // call preventDefault() to avoid page rerendering
    event.preventDefault();

    if (quantityInput.current) {
      // get quantity entered in input field
      const quantity = parseInt(quantityInput.current.value, 10);
      console.log(
        `Quantity in child AddToCart after form submission: ${quantity}`
      );
      // pass data to parent component, by calling the method provided as prop
      dispatch({
        type: "editCart",
        payload: { productId: productId, quantity: quantity },
      });
      // reset quantityi in productList
      if (!inCart) {
        quantityInput.current.value = "1";
      }
    }
  };

  // STYLED COMPONENTS
  const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  const DeleteButton = styled.button`
    visibility: ${inCart ? "visible" : "hidden"};
  `;

  const AddToCart = styled.button`
    width: 70%;
    display: inline-block;
  `;

  const Input = styled.input`
    width: 30%;
    display: inline-block;
  `;

  console.log(`RENDERING AddToCart`);
  return (
    // set onSubmit event to submitForm method
    <Form onSubmit={submitForm}>
      <Input
        type="text"
        name="quantity"
        id="quantity"
        // use ref property to connect input field to quantityInput variable
        ref={quantityInput}
        // set default value to quantity variable
        defaultValue={quantity}
      />
      <AddToCart type="submit">{buttonText}</AddToCart>
      <DeleteButton
        onClick={() =>
          dispatch({
            type: "editCart",
            // pass 0 as quantity to delete from cart
            payload: { productId: productId, quantity: 0 },
          })
        }
      >
        Delete
      </DeleteButton>
    </Form>
  );
};

export default AddToCart;
