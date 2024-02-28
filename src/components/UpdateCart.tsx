// import React, { useState } from "react";
// // import useRef to get quantity input enter by user
// import { useRef } from "react";
// // imports for context
// import { useContext } from "react";
// // import models
// import { OrderItem } from "../models/OrderItem";
// import { ProductContext } from "../ProductContext";
// // import for styling
// import styled from "@emotion/styled";

// // props:
// // productId
// // inCart to show if parent component is cart
// const AddToCart: React.FunctionComponent<{
//   productId: number;
// }> = ({ productId}) => {
//   const [quantity, setQuantity ] = useState(1)
//   // TODO: Why is type of productId is string???
//   // console.log(
//   //   `ProductId: ${productId} type: ${typeof productId}, while type of quantity ${typeof quantity}`
//   // );
//   const { state, dispatch } = useContext(ProductContext);
//   // text on from submit button
//   const submitButtonText = inCart ? "Update Quantity" : "Add To Cart";
//   const mode = inCart ? "update" : "add";
//   const deleteButtonVisibility = inCart ? "visible" : "hidden";

//   // if component child of cart component set quantity to current quantity in cart
//   if (inCart) {
//     const cart = state.cart?.items;
//     const quantityInCart = cart?.filter(
//       (item) => (item.productId = productId)
//     )[0].quantity;
//     quantity = quantityInCart as number;
//   }

//   // create reference to quantity input field
//   const quantityInput = useRef<HTMLInputElement>(null);

//   const submitForm = (event: React.FormEvent) => {
//     // call preventDefault() to avoid page rerendering
//     event.preventDefault();

//     if (quantityInput.current) {
//       // get quantity entered in input field
//       const quantity = parseInt(quantityInput.current.value, 10);
//       console.log(
//         `Quantity in child AddToCart after form submission: ${quantity} for product ${productId}`
//       );
//       // pass data to parent component, by calling the method provided as prop
//       console.log(`typeof productId before dispatch: ${typeof productId}`);
//       dispatch({
//         type: "editCart",
//         payload: {
//           item: { productId: productId, quantity: quantity },
//           mode: mode,
//         },
//       });
//       // reset quantityi in productList
//       if (!inCart) {
//         quantityInput.current.value = "1";
//       }
//     }
//   };

//   // STYLED COMPONENTS
//   const Form = styled.form`
//     width: 100%;
//     display: flex;
//     justify-content: center;
//   `;

//   const DeleteButton = styled.button`
//     visibility: ${inCart ? "visible" : "hidden"};
//   `;

//   const SubmitButton = styled.button`
//     width: 70%;
//     display: inline-block;
//   `;

//   const Input = styled.input`
//     width: 30%;
//     display: inline-block;
//   `;

//   // console.log(`RENDERING AddToCart`);
//   return (
//     // set onSubmit event to submitForm method
//     <Form onSubmit={submitForm}>
//       <Input
//         type="text"
//         name="quantity"
//         id="quantity"
//         // use ref property to connect input field to quantityInput variable
//         ref={quantityInput}
//         // set default value to quantity variable
//         defaultValue={quantity}
//       />
//       {/* submits form */}
//       <SubmitButton type="submit">{submitButtonText}</SubmitButton>
//       <DeleteButton
//         onClick={() =>
//           dispatch({
//             type: "editCart",
//             // pass 0 as quantity to delete from cart
//             payload: {
//               item: { productId: productId, quantity: 0 },
//               mode: mode,
//             },
//           })
//         }
//       >
//         Delete
//       </DeleteButton>
//     </Form>
//   );
// };

// export default AddToCart;
