// imports for routing
import { Routes, Route } from "react-router-dom";
// import ProductsProvider to provide context to components
import ProductsProvider from "./ProductContext";
// import components
import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
// import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      {/* wrap components into context provider */}
      <ProductsProvider>
        {/* <Routes> will handle what components to display */}
        <Routes>
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/" element={<ProductList />} />
        </Routes>
      </ProductsProvider>
    </div>
  );
}

export default App;
