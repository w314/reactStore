# Tutorial
Step by step guide to create rStore

## Setup Project
```bash
# create
yarn create vite
# setup git
git init
# start
yarn run dev
```

## Create Product Model
```bash
mkdir src/models
touch src/models/ProductModel.ts
```
`src/models/ProductInterface.ts`:
```typescript
export default interface ProductInterface {
  id: number
  name: string
  categoryId: number
  description: string
  price: number
  url: string
}
```

## Get products from server
In lieu of server add: `mock_products.json` to `public`
```bash
touch public/mock_products.json
```
```javascript
[{"id":6,"name":"Book","price":9.99,"url":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"You can read it!","category_id":1},
{"id":7,"name":"Headphones","price":249.99,"url":"https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Listen to stuff!","category_id":2},
{"id":8,"name":"Backpack","price":79.99,"url":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Carry things around town!","category_id":8},
{"id":9,"name":"Glasses","price":129.99,"url":"https://images.unsplashcom/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Now you can see!","category_id":8},
{"id":10,"name":"Cup","price":4.99,"url":"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Drink anything with it!","category_id":7},
{"id":11,"name":"Shirt","price":29.99,"url":"https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80","description":"Wear it with style!","category_id":3}
]
```

### Create Product Context
```bash
touch src/ProductContext.tsx
```

`src/ProductContext.tsx`:
```typescript
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
```

## Display Product List
Create ProductList component:
```bash
mkdir src/components
touch src/components/ProductList.tsx
```
`src/components/ProductList.tsx`:
```typescript
import React from 'react'
// import useContext to use context to get products
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'

export default function ProductList() {

  // use object desturcturing 
  // to get products from context
  const { products } = useContext(ProductContext)

  return (
    // if we have products
    products ?
    // return html
    <div>
      {/* display list of products names */}
      <ul>
        {/* to avoid error if products is null */}
        {products.map(product => {
          return (
            // set key for each iteration
            // for this example as name is uniuq it will suffice
            <li key={product.name}>{product.name}</li>
          )
        })}
      </ul>
    </div>
    // if products is [] return null
    : null
  )
}
```
`src/App.tsx`:
```typescript
// import ProductsProvider to provide context to components
import ProductsProvider from './ProductContext'
// import ProductList component to display
import ProductList from './components/ProductList'

function App() {
  return (
    // wrap components into context provider
    <ProductsProvider>
      <ProductList></ProductList>
    </ProductsProvider>
  )
}

export default App

```
