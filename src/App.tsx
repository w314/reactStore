import { Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList'
import Product from './components/Product'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductList />}/>
      <Route path='/products/:id' element={<Product />}/>
    </Routes>
  )
}

export default App
