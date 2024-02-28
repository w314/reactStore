// imports for using context
import { createContext, useReducer, useEffect } from "react";
// import models
import { ProductType } from "./models/ProductType";
import { Order } from "./models/Order";
import { OrderItem } from "./models/OrderItem";

// *** SET TYPES USED *** //

// create state type
type StateType = {
  products: ProductType[] | null;
  cart: Order | null;
  selectedProduct: ProductType | null;
};

// create action type for dispatch used in the useReducer to manage state
// it will list all possible actions needed to manage our state
// all actions will have a name set in the type property
// and a payload which is the data input needed for that action
type ActionType =
  | { type: "setProducts"; payload: ProductType[] }
  | { type: "editCart"; payload: { item: OrderItem; mode: "add" | "update" } }
  | { type: "setSelectedProduct"; payload: ProductType };

// create context type
// context will provide the following information
// to all children that use it
type ProductContextType = {
  state: StateType;
  dispatch: (action: ActionType) => void;
};

// *** DEFINE STATE *** //

// set initital state
const initialState: StateType = {
  products: null,
  cart: null,
  selectedProduct: null,
};

// define reducer function that will manage state
// it receives the current state and the action to implement as props
// the reducer will modify state as needed based on the action type
// and return the new state
// do add types to props AND return type or check if it was properly deducted                                   in
const productReducer = (state: StateType, action: ActionType): StateType => {
  // modify state return new state based on type of action to be done
  switch (action.type) {
    case "setProducts":
      // use spread operator to return new state
      // with products set to the product list provided by the payload
      return { ...state, products: action.payload };

    case "setSelectedProduct":
      return { ...state, selectedProduct: action.payload };

    case "editCart":
      const { productId, quantity } = action.payload.item;
      const mode = action.payload.mode;

      // console.log(
      //   `Editing cart with payload: ${JSON.stringify(action.payload, null, 2)}`
      // );
      // console.log(`Cart before editing: ${state.cart}`);

      // if cart is empty add item to cart
      if (state.cart == null) {
        state.cart = {
          items: [action.payload.item],
          status: "active",
        };
        console.log(
          `Cart after editing: ${JSON.stringify(state.cart, null, 2)}`
        );

        return { ...state };
      }

      // if cart already has items in it ...

      // if quantity is zero
      // if mode is 'add' we don't have to do anything
      // if mode is 'update' delete item from cart
      if (quantity === 0 && mode === "update") {
        const newCartItems = state.cart.items.filter(
          (item) => item.productId != productId
        );
        return { ...state, cart: { items: newCartItems, status: "active" } };
      }

      // if quantity is non-zero

      // check if product is already in cart
      const itemToEdit = state.cart.items.filter(
        (item) => item.productId === productId
      );

      // if product is already in cart
      if (itemToEdit.length > 0) {
        // get old quantity
        const oldQuantity = itemToEdit[0].quantity;
        // if mode is 'add' add quantity provided in payload to oldQuantity
        // if mode is 'update' replace old quantity with the one provided in the payload
        const newQuantity = mode === "add" ? oldQuantity + quantity : quantity;
        itemToEdit[0].quantity = newQuantity;
        return { ...state };
      }

      // if product is not in cart add orderItem to cart
      state.cart.items.push(action.payload.item);
      return { ...state };

    // in case of unknown type throw error
    default:
      throw new Error();
  }
};

// *** CREATE CONTEXT  *** //

// create context and provide initial values
// export the context, for components to import it as needed
export const ProductContext = createContext<ProductContextType>({
  state: initialState,
  dispatch: (action: ActionType) => {},
});

// create context provider function
// it takes children as prop and will return them wrapped in the provider
const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  // create state, provide reducer function for managing state and initial state
  // const [state, dispatch ] = useReducer(productReducer, initialState)
  const [state, dispatch] = useReducer(productReducer, initialState);

  // get products from server
  // useEffect runs when the second parameter changes
  // as [] will never change, it will only run once when the app starts
  useEffect(() => {
    fetch("../../public/products.JSON")
      // fetch returns a promise, that resolves with the response object
      // the response is the representation of the entire HTTP response
      // the json() method returns a second promise
      // that parses the HTTP body text as JSON
      .then((response) => {
        return response.json();
      })
      // use the data received to set products
      .then((data) => dispatch({ type: "setProducts", payload: data }));
  }, []);

  // return child nodes wrapped in the provider
  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// export provider
export default ProductsProvider;
