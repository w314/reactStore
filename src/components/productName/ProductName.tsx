import './ProductName.css'

type ProductNameProps = {
  name: string
}

export function ProductName(props: ProductNameProps) {
  return <p>{props.name}</p>
}