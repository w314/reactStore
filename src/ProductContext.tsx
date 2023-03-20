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
          return response.json()
        })
        // use the data received to set products
        .then(data =>  dispatch({type: 'setProducts', payload: data}))
  }, [])


  // return child nodes wrapped in the provider
  return (
    <ProductContext.Provider value={{
      state,
      dispatch
    }}>
       {children}
    </ProductContext.Provider>
  )
}

// export provider
export default ProductsProvider
