import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItem} = props

  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    dish_price: dishPrice,
    quantity,
  } = cartItem

  const onClickIncrement = () => {
    incrementCartItemQuantity(dishId)
  }

  const onClickDecrement = () => {
    decrementCartItemQuantity(dishId)
  }

  const onClickRemove = () => {
    removeCartItem(dishId)
  }

  return (
    <li className="cart-item">
      <img src={dishImage} alt={dishName} className="cart-item-image" />

      <div className="cart-item-details">
        <h1 className="cart-item-name">{dishName}</h1>

        <p className="cart-item-price">
          {dishCurrency} {dishPrice * quantity}
        </p>

        <div className="cart-counter">
          <button
            type="button"
            className="counter-btn"
            onClick={onClickDecrement}
          >
            -
          </button>

          <p className="count">{quantity}</p>

          <button
            type="button"
            className="counter-btn"
            onClick={onClickIncrement}
          >
            +
          </button>
        </div>
      </div>

      <button type="button" className="remove-btn" onClick={onClickRemove}>
        Remove
      </button>
    </li>
  )
}

export default CartItem
