// imports for using context
import { useContext, createContext, useState, useEffect } from 'react'
// import Product Model
import ProductInterface from './models/ProductInterface'


// create context type
interface ProductContextInterface {
  products: ProductInterface[] | null
}

// create context with providing initial values
// export the context, for components to import it as needed
export const ProductContext = createContext<ProductContextInterface>({
  products: []
})

// create context provider function
// it takes children as prop and will return them wrapped in the provider
const ProductsProvider = ({children}:{children:React.ReactNode}) => {

  // create state to store products provided, set starting value
  const [products, setProducts] = useState<ProductInterface[] | null>(null)

  // get products from server
  // useEffect runs when the second parameter changes
  // as [] will never change, it will only run once when the app starts
  useEffect(() => {
      fetch('../public/products.json')
        // fetch returns a promise, that resolves with the response object
        // the response is the representation of the entire HTTP response
        // the json() method returns a second promise 
        // that parses the HTTP body text as JSON 
        .then(response => response.json())
        // use the data received to set products
        .then(data => setProducts(data))
  }, [])

  // return child nodes wrapped in the provider
  return (
    <ProductContext.Provider value={{products}}>
       {children}
    </ProductContext.Provider>
  )
}

// export provider
export default ProductsProvider
