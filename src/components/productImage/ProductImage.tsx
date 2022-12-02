import './ProductImage.css'

type ProductImageProps = {
  url: string
  alt: string
}

export function ProductImage(props: ProductImageProps) {
  return <img src={props.url} alt={props.alt} />
}