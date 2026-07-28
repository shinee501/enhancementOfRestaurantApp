import {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Home = () => {
  const [restaurant, setRestaurant] = useState({})
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [dishCounts, setDishCounts] = useState({})

  const {cartList, addCartItem} = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      const data = await response.json()

      setRestaurant(data[0])
      setCategories(data[0].table_menu_list)
    }

    fetchData()
  }, [])

  const increment = dishId => {
    setDishCounts(prevState => ({
      ...prevState,
      [dishId]: (prevState[dishId] || 0) + 1,
    }))
  }

  const decrement = dishId => {
    setDishCounts(prevState => {
      const currentCount = prevState[dishId] || 0

      if (currentCount === 0) {
        return prevState
      }

      return {
        ...prevState,
        [dishId]: currentCount - 1,
      }
    })
  }

  const onClickAddToCart = dish => {
    const quantity = dishCounts[dish.dish_id] || 0

    if (quantity > 0) {
      addCartItem({
        ...dish,
        quantity,
      })
    }
  }

  const dishes =
    categories.length > 0 ? categories[activeTab].category_dishes : []

  return (
    <>
      <Header
        restaurantName={restaurant.restaurant_name}
        cartCount={cartList.length}
      />

      <div className="app">
        <div className="tabs">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category.menu_category_id}
              className={activeTab === index ? 'active-tab tab' : 'tab'}
              onClick={() => setActiveTab(index)}
            >
              {category.menu_category}
            </button>
          ))}
        </div>

        <div className="dish-list">
          {dishes.map(dish => (
            <div className="dish-card" key={dish.dish_id}>
              <div className="dish-info">
                <h3>{dish.dish_name}</h3>

                <p>
                  {dish.dish_currency} {dish.dish_price}
                </p>

                <p>{dish.dish_description}</p>

                <p>{dish.dish_calories} Calories</p>

                <div className="counter">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => decrement(dish.dish_id)}
                    disabled={!dish.dish_Availability}
                  >
                    -
                  </button>

                  <p className="count">{dishCounts[dish.dish_id] || 0}</p>

                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => increment(dish.dish_id)}
                    disabled={!dish.dish_Availability}
                  >
                    +
                  </button>
                </div>

                {!dish.dish_Availability && (
                  <p className="not-available">Not available</p>
                )}

                {dish.dish_Availability &&
                (dishCounts[dish.dish_id] || 0) > 0 ? (
                  <button
                    type="button"
                    className="add-cart-btn"
                    onClick={() => onClickAddToCart(dish)}
                  >
                    ADD TO CART
                  </button>
                ) : null}

                {dish.addonCat && dish.addonCat.length > 0 && (
                  <p className="customization">Customizations available</p>
                )}
              </div>

              <img
                src={dish.dish_image}
                alt={dish.dish_name}
                className="dish-image"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
