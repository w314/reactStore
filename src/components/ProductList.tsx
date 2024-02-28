import React from "react";
// import useContext to use context to get products
import { useContext } from "react";
import { ProductContext } from "../ProductContext";
// import child components
import Product from "./Product";
import AddToCart from "./AddToCart";
// import models
import { OrderItem } from "../models/OrderItem";
// import for styling
import styled from "@emotion/styled";

// STYLED COMPONENTS
const Products = styled.div`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ProductDiv = styled.div`
  width: 100%;
  padding: 2%;
  min-width: 280px;
  max-width: 350px;
  margin: auto;
  text-align: center;
`;

export default function ProductList() {
  // use object destructuring
  // to get state and dispatch from context
  const { state, dispatch } = useContext(ProductContext);

  // console.log(`RENDERING ProductList`)
  return (
    // if we have products
    state.products ? (
      // return html
      <Products>
        {/* to avoid error if products is null */}
        {state.products.map((product) => {
          return (
            // set key for each iteration
            <ProductDiv key={product.id}>
              {/* use child component Product to display product
          set product property to product to send data to child component
          set withDetail to false as we don't want product details here */}
              <Product product={product} withDetail={false}></Product>
              {/* pass inCart to let child component know if it is displayed within the cart component 
            pass productId so that child component can use it to edit cart */}
              <AddToCart productId={product.id}></AddToCart>
            </ProductDiv>
          );
        })}
      </Products>
    ) : // if products is [] return null
    null
  );
}
