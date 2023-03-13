// import { Routes, Route } from 'react-router-dom'
// import ProductsProvider to provide context to components
import ProductsProvider from './ProductContext'
// import ProductList component to display
import ProductList from './components/ProductList'

function App() {
  // return (
  //   <Routes>
  //     <Route path='/' element={<ProductList />}/>
  //     <Route path='/products/:id' element={<Product />}/>
  //   </Routes>
  // )
  return (
    // wrap components into context provider
    <ProductsProvider>
      <ProductList></ProductList>
    </ProductsProvider>
  )
}

export default App
