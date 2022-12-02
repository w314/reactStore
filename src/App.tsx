import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProductList } from './components/productList/ProductList'
import { Product } from './components/product/Product'
import { Checkout } from './components/checkout/Checkout'
import { Cart } from './components/cart/Cart'

function App(){

    return (
        <Routes>
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            {/* redirecting any non-existent path to home page */}
            <Route path='*' element={<Navigate to='/products' />} />
        </Routes>
    )
}

export default App

