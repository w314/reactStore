type ProductPriceProps = {
  price: number
}

export function ProductPrice(props: ProductPriceProps) {
  const dollarUs = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return <p>{dollarUs.format(props.price)}</p>
}