import React from 'react'
// imports for routing
import { Link } from 'react-router-dom'

export default function NavBar() {
  console.log(`RENDERING NAVBAR`)
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
