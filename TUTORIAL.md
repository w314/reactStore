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
touch src/models/ProductType.ts
```
`src/models/ProductType.ts`:
```typescript
export type ProductType = {
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
import { createContext, useState, useEffect } from 'react'
// import Product Model
import { ProductType } from './models/ProductType'

// create context type
interface ProductContextInterface {
  products: ProductType[] | null
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
  const [products, setProducts] = useState<ProductType[] | null>(null)

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

## Use Product child component to display name of product

Change method of state management from useState to useReducer:
(and add selectedProduct to state that is not used in this step)
Edit `src/ProductContext.tsx`:
```typescript
// imports for using context
import { createContext, useReducer, useEffect } from 'react'
// import Product Model
import { ProductType}  from './models/ProductType'

// *** SET TYPES USED *** //

// create state type
type StateType = {
  products: ProductType [] | null
  selectedProduct: ProductType | null
}

// create action type for dispatch used in the useReducer to manage state
// it will list all possible actions needed to manage our state
// all actions will have a name set in the type property
// and a payload which is the data input needed for that action
type ActionType =  
  { type: 'setProducts', payload: ProductType [] } |
  { type: 'setSelectedProduct', payload: ProductType }

// create context type
// context will provide the following information
// to all children that use it
type ProductContextType = {
  state: StateType,
  dispatch: (action: ActionType) => void
}

// *** DEFINE STATE *** //

// set initital state
const initialState: StateType = {
  products: null,
  selectedProduct: null
}


// define reducer function that will manage state
// it receives the current state and the action implement as props
// the reducer will modify state as needed based on the action type
// and return the new state
// do add types to props AND return type or check if it was properly deducted                                   in 
const productReducer = (state: StateType, action: ActionType): StateType => {
  // modify state return new state based on type of action to be done
  switch(action.type) {
    case 'setProducts':
      // use spread operator to return new state
      // with products set to the product list provided by the payload
      return { ...state, products: action.payload}
    case 'setSelectedProduct':
      return { ...state, selectedProduct: action.payload }
    // in case of unknown type throw error
    default:
      throw new Error()
  }
}

// *** CREATE CONTEXT  *** //

// create context and provide initial values
// export the context, for components to import it as needed
export const ProductContext = createContext<ProductContextType>({
  state: initialState,
  dispatch: (action: ActionType) => {}
})


// create context provider function
// it takes children as prop and will return them wrapped in the provider
const ProductsProvider = ({children}:{children:React.ReactNode}) => {

    
  // create state, provide reducer function for managing state and initial state
  // const [state, dispatch ] = useReducer(productReducer, initialState)
  const [ state, dispatch ] = useReducer(productReducer, initialState)

  // get products from server
  // useEffect runs when the second parameter changes
  // as [] will never change, it will only run once when the app starts
  useEffect(() => {
      fetch('../../public/products.JSON')
        // fetch returns a promise, that resolves with the response object
        // the response is the representation of the entire HTTP response
        // the json() method returns a second promise 
        // that parses the HTTP body text as JSON 
        .then(response => {
          console.log(`Response: \n ${response}`)
          return response.json()
        })
        // use the data received to set products
        .then(data =>  dispatch({type: 'setProducts', payload: data}))
  }, [])
//...
```

Create child component:
```bash
touch src/component/Product.tsx
```
`src/component/Product.tsx`:
```typescript
import React from 'react'
import { ProductContext } from '../ProductContext'
import { ProductType } from '../models/ProductType'

// define react funtion component
// add product as prop to be received from parent component
const Product: React.FunctionComponent<{product: ProductType}> =
  ({product}) => (
    <div>{product.name}</div>
  )

export default Product
```

Edit `src/components/ProductList.tsx`
- modify to use state accroding to useReducer
- use Product component to display product name
```typescript
// import Product component
import Product from './Product'
// ....
  const { state } = useContext(ProductContext)
// ...
  // use child component (Product) to display product name
  // set product property to product to send data to child component
  <li key={product.name}><Product product={product}></Product></li>
//...
```

## Create Navigation with Product List and Cart
Create Cart component:
```bash
touch src/components/Cart.tsx
```
Create NavBar component
```bash
touch src/components/NavBar.tsx
```
Add router to project
```bash
yarn add react-router-dom
```
Wrap <App /> into <BrowserRouter> in `src/main.tsx`
```tsx
// imports for routing
import { BrowserRouter } from 'react-router-dom'
// ...
// enclose <App /> in <BrowserRouter />
<BrowserRouter>
  <App />
</BrowserRouter>
//...
```

Create Routes in `src/App.tsx`:
```tsx
// imports for routing
import { Routes, Route } from 'react-router-dom'
// import components
import ProductList from './components/ProductList'
import NavBar from './components/NavBar'
import Cart from './components/Cart'

//...

  return (
    <div>
      <NavBar></NavBar>
      {/* wrap components into context provider */}
      <ProductsProvider>
        {/* <Routes> will handle what components to display */}
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ProductList /> } />
        </Routes>
      </ProductsProvider>  
    </div>
  )
//...
```

Create NavBar `src/components/NavBar.tsx`:
```tsx
import React from 'react'
// imports for routing
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <ul>
        {/* use <Link> tag instead of <a> tag */}
        <li key='products'><Link to="products">products</Link></li>
        <li key='cart'><Link to="cart">cart</Link></li>
      </ul>
    </nav>
  )
}
```
## Add Form AddToCart
We'll create a child component AddToCart that has a form where the user can update the quantity and will pass that updated quantity back to the parent component.

Create addToCart component:
```bash
touch src/components/AddToCart
```
`src/components/AddToCart.tsx`:
```tsx
import React from 'react'
// import useRef
import { useRef } from 'react'

// add updateQuantity as prop to be received from parent component
// will be used to pass value from child component to parent
const AddToCart: React.FunctionComponent<({updateQuantity:(quantity:number) => void})>
 = ({updateQuantity}) => {

  let quantity = 0
  // create reference to quantity input field
  const quantityInput = useRef<HTMLInputElement>(null)

  const submitForm = (event:React.FormEvent) => {
    // call preventDefault() to avoid page rerendering
    event.preventDefault()

    if(quantityInput.current){
      // get quantity entered in input field
      const quantity = parseInt(quantityInput.current.value, 10)
      console.log(`Quantity in child AddToCart after form submission: ${quantity}`)
      // pass data to parent component, by calling the method provided as prop
      updateQuantity(quantity)
    }
  }

  return (
    // set onSubmit event to submitForm method
    <form onSubmit={submitForm}>
      <input type="number"
        name="quantity" 
        id="quantity" 
        // use ref property to connect input field to quantityInput variable
        ref={quantityInput}
        // set daefault value to quantity variable
        defaultValue={quantity}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddToCart
```

Edit `src/components/ProductList.tsx` to iclude AddToCart component:
```tsx
// import child components
import AddToCart from './AddToCart'
//...
  // create function to update quantity
  // pass it later to child component to get updated quantity value
  const updateQuantity = (quantity:number) => {
    console.log(`Quantity in ProductList component: ${quantity}`)
  }
//...
  {/* set updateQuantity prop in child component to updateQuantity 
    function defined here, this will allow child component
    to pass data (the updated quantity) to the parent compenent */}
  <AddToCart updateQuantity={updateQuantity}></AddToCart>
```

## Make add to cart form in ProductList component add items to cart
### Create Models for Cart
Create OrderItem model:
```bash
touch src/models/OrderItem.ts
```
`src/models/OrderItem.ts`:
```ts
export default interface OrderItem {
  productId: number,
  quantity: number
}
```
Create Order model:
```bash
touch src/app/models/Order.ts
```

`src/models/Order.ts`:
```ts
import OrderItem from "./OrderItem"

export default interface Order {
  items: OrderItem[]
  status: 'completed' | 'active'
}
```

### Update AddToCart component 
- change props to: 
  - productId
  - editCart function with OrderItem prop 
`src/components/AddToCart.tsx`:
```tsx
//...
// import models
import { OrderItem } from '../models/OrderItem'

// props: 
// productId
// editCart function that will handle if we add to the cart
const AddToCart: React.FunctionComponent<({productId: number, editCart:(item: OrderItem) => void})>
 = ({productId, editCart}) => {
//... in submitFrom:
      // pass data to parent component, by calling the method provided as prop
      editCart({productId: productId, quantity: quantity})
//...
```

### Change ProductList to pass proper component to addToCart
- get both state and dispatch from `ProductContext`
- define editCart function to pass to `AddToCart` component
- change properties passed to `AddToCart` component
`src/components/ProductList`:
```tsx
//...
// import models
import { OrderItem } from '../models/OrderItem'
//...
  // use object destructuring 
  // to get state and dispatch from context
  const { state, dispatch } = useContext(ProductContext)

  // create function to update cart
  // pass it later to child component to get the quantity value
  const editCart = (item: OrderItem) => {
    console.log(`Quantity in ProductList component: ${item.quantity}`)
    dispatch({type:'editCart', payload: item})
  }
//...
      {/* set editCart prop in child component to editCart 
        function defined here, this will allow child component
        to pass data (the updated quantity) to the parent compenent 
        pass productId so that child component can pass it back with the quanitty */}
      <AddToCart editCart={editCart} productId={product.id}></AddToCart>
//...
```

### Edit Cart component to show items
`src/components/cart.tsx`
```tsx
import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../ProductContext'

export default function Cart() {

  // use object destructuring 
  // to get state from context  
  const { state } = useContext(ProductContext)
  const cart = state.cart

  return (
    cart ?
    // if cart is not null display items
    <div>
        <ul>
          {cart?.items.map(item => { 
            return (
              <li key="item.productId">
                item: {item.productId} quantity: {item.quantity}
              </li>
            )
          })}
        </ul>
    </div>
    // if cart is null dispaly empty cart message
    : <div>Your Cart is Empty</div>
  )
}
```

### Edit ProductContext to add cart functionality
- add cart to state
- add editCart action to dispatch
`src/ProductContext.tsx`:
```tsx
//...
// import models
import { Order } from './models/Order'
import { OrderItem } from './models/OrderItem'

// edit state type to add cart
type StateType = {
  products: ProductType [] | null
  cart: Order | null
  selectedProduct: ProductType | null
}

// add editCart action type
type ActionType =  
  { type: 'setProducts', payload: ProductType [] } |
  { type: 'editCart', payload: OrderItem } |
  { type: 'setSelectedProduct', payload: ProductType }


// *** DEFINE STATE *** //

// add cart to initital state
const initialState: StateType = {
  products: null,
  cart: null,
  selectedProduct: null
}

// add editCart to reducer                            
const productReducer = (state: StateType, action: ActionType): StateType => {
  switch(action.type) {
    case 'editCart': 
      if( state.cart ) {
        console.log(`in edit cart item, with existing cart: ${action.payload}`)
        // check if product is already in cart
        const itemToEdit = state.cart.items.filter(item => 
          item.productId === action.payload.productId)
        // if product is already in cart update quantity
        if(itemToEdit.length > 0) {
          itemToEdit[0].quantity = action.payload.quantity
        } 
        // if product is not in cart add orderItem to cart
        else {
          state.cart.items.push(action.payload)
        }
      } else {
        console.log(`in edit cart item, just starting new cart: ${action.payload}`)
        state.cart = 
          {
            items: [action.payload],
            status: 'active' 
          }
      }
      for(let item of state.cart.items) {
        console.log(item.productId, item.quantity)
      }
      return {...state}
//...    
```