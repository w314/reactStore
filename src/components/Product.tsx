import React from "react";
// import models
import { ProductType } from "../models/ProductType";
// import child components
import ProductImage from "./ProductImage";

// define react funtion component
// add product as prop to be received from parent component
const Product: React.FunctionComponent<{
  product: ProductType;
  withDetail: boolean;
}> = ({ product, withDetail }) => {
  // console.log(`RENDERING PRODUCT ${product.name}`)
  return (
    <div>
      <ProductImage url={product.url} name={product.name}></ProductImage>
      {product.name}
    </div>
  );
};

export default Product;
