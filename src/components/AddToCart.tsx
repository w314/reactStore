import React, { useState } from "react";
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
}> = ({ productId }) => {
  // TODO: Why is type of productId is string???
  // console.log(
  //   `ProductId: ${productId} type: ${typeof productId}, while type of quantity ${typeof quantity}`
  // );
  const { state, dispatch } = useContext(ProductContext);
  const quantityInput = useRef<HTMLInputElement>(null);

  // STYLED COMPONENTS
  const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  const SubmitButton = styled.button`
    width: 70%;
    display: inline-block;
  `;

  const Input = styled.input`
    width: 30%;
    display: inline-block;
  `;

  // console.log(`RENDERING AddToCart`);
  return (
    <>
      <Input
        type="number"
        name="quantity"
        id="quantity"
        // use ref property to connect input field to quantityInput variable
        ref={quantityInput}
        // set default value to quantity variable
        defaultValue={1}
      />
      <button onClick={() => console.log(quantityInput.current?.value)}>
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;
