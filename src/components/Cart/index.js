import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  return (
    <>
      <Header restaurantName="UNI Resto Cafe" cartCount={cartList.length} />

      <div className="cart-container">
        {cartList.length === 0 ? (
          <EmptyCartView />
        ) : (
          <>
            <div className="cart-header">
              <h1>Cart</h1>

              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>

            <ul className="cart-list">
              {cartList.map(eachItem => (
                <CartItem key={eachItem.dish_id} cartItem={eachItem} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
