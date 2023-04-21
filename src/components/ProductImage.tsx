import React from "react";
// imports for styling
import styled from "@emotion/styled";

// STYLED COMPONENTS
const Image = styled.img`
  width: 100%;
  /* padding: 0.2rem; */
  margin: 0;
  padding: 0;
`;

const ProductImage: React.FunctionComponent<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  return <Image src={url} alt={name} />;
};

export default ProductImage;
