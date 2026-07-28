import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty cart"
      className="empty-cart-image"
    />

    <h1>Your Cart Is Empty</h1>

    <p>Add something from the restaurant menu.</p>
  </div>
)

export default EmptyCartView
