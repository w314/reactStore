# Tutorial

## Setup

### 1. Create app
```bash
npm create vite
cd rstore
npm install
npm run dev
```
- app name: rstore
- select `react` as framework
- select `typescript` as variant

### 2. Remove unecessary default content
```bash
rm -r src/assets
rm src/App.css
rm src/index.css
```

Delete `import './index.css'` from `main.tsx`
```bash
sed -i '/index.css/d'  src/main.tsx
```
- `sed` is a text editing command
- `-i` for editing the file itself
- `'/index.css/d'` will delete (`d`) the line with the pattern provided (`index.css`) 


### 3. Create files and directories
```bash
mkdir src/components
mkdir src/components/productList
mkdir src/components/productImage
mkdir src/components/productPrice
mkdir src/components/productName
mkdir src/components/addToCart
mkdir src/components/navBar
mkdir src/components/product
mkdir src/components/checkout
mkdir src/components/cart
touch src/components/productList/ProductList.tsx
touch src/components/productImage/ProductImage.tsx
touch src/components/productPrice/ProductPrice.tsx
touch src/components/productName/ProductName.tsx
touch src/components/addToCart/AddToCart.tsx
touch src/components/navBar/NavBar.tsx
touch src/components/product/Product.tsx
touch src/components/cart/Cart.tsx
touch src/components/checkout/Checkout.tsx
```


### 3. Setup Router

Install `react router`

```bash
npm i react-router-dom
```

Edit `src/main.tsx`:
```tsx
import { BrowserRouter } from 'react-router-dom'
// ...
<BrowserRouter>
    <App />
</BrowserRouter>
//...
```

Replace content of `src/App.tsx` with:
```tsx
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
```
Create mock components to set up project sceleton:
```bash
echo 'export function ProductList() {return <h1>PRODUCT LIST</h1>' > src/components/productList/ProductList.tsx

echo 'export function Product() {return <h1>PRODUCT</h1>' > src/components/product/Product.tsx

echo 'export function Cart() {return <h1>CART</h1>' > src/components/cart/Cart.tsx

echo 'export function Checkout() {return <h1>CHECKOUT</h1>' > src/components/checkout/Checkout.tsx
```
