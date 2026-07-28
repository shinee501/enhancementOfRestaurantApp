import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const {restaurantName, cartCount, history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header">
      <Link to="/" className="link">
        <h1 className="restaurant-name">{restaurantName}</h1>
      </Link>

      <div className="header-right">
        <p className="orders-text">My Orders</p>

        <Link to="/cart">
          <button type="button" className="cart-btn" data-testid="cart">
            <FaShoppingCart size={22} />

            <span className="cart-count">{cartCount}</span>
          </button>
        </Link>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)
