import {useState, useEffect} from 'react'
import './App.css'

const App = () => {
  const [restaurant, setRestaurant] = useState({})
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [dishCounts, setDishCounts] = useState({})

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
    setDishCounts(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const decrement = dishId => {
    setDishCounts(prev => {
      const currentCount = prev[dishId] || 0

      if (currentCount === 0) {
        return prev
      }

      return {
        ...prev,
        [dishId]: currentCount - 1,
      }
    })
  }

  const cartCount = Object.values(dishCounts).reduce(
    (total, count) => total + count,
    0,
  )

  const dishes =
    categories.length > 0 ? categories[activeTab].category_dishes : []

  return (
    <div className="app">
      <header className="header">
        <h1>{restaurant.restaurant_name}</h1>

        <div className="cart-container">
          <p>My Orders</p>
          <p>{cartCount}</p>
        </div>
      </header>

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
              <p className="dish-name">{dish.dish_name}</p>

              <p>
                {dish.dish_currency} {dish.dish_price}
              </p>

              <p>{dish.dish_description}</p>

              <p>{dish.dish_calories} calories</p>

              {dish.addonCat && dish.addonCat.length > 0 && (
                <p className="customization">Customizations available</p>
              )}

              {dish.dish_Availability ? (
                <div className="counter">
                  {' '}
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => decrement(dish.dish_id)}
                  >
                    {' '}
                    -{' '}
                  </button>{' '}
                  <p className="count">{dishCounts[dish.dish_id] || 0}</p>{' '}
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => increment(dish.dish_id)}
                  >
                    {' '}
                    +{' '}
                  </button>{' '}
                </div>
              ) : (
                <p className="not-available">Not available</p>
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
  )
}

export default App
