import './styles/index.css'
import './components/StoreData'
import { useState } from 'react'
import StoreData from './components/StoreData'

export default function App() {
  // ⬇️ the below is the state for everything in the store
  const [store, setStore] = useState(StoreData)
  // ⬇️ the below is the state for the cart
  const [cart, setCart] = useState([
    {
      id: '001-beetroot', //<- the item id matches the icon name in the assets/icons folder
      quantity: 5
    },
    {
      id: '002-carrot', //<- the item id matches the icon name in the assets/icons folder
      quantity: 14
    },
    {
      id: '003-apple', //<- the item id matches the icon name in the assets/icons folder
      quantity: 12
    }
  ])

  function addToCart(itemId) {
    const updatedCart = cart.map(cartItem =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
    setCart(updatedCart)
  }

  // we need quantity from cart and price from store then mulitply
  let total = 0
  for (const cartItem of cart) {
    const storeItem = store.find(storeItem => (storeItem.id = cartItem.id))
    total += cartItem.quantity * storeItem.price
  }
  console.log('this is total', total)

  return (
    <div className="App">
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {/* mapping to produce all the items stored in StoreData */}
          {store.map(item => (
            <li>
              <div className="store--item-icon">
                <img src={`assets/icons/${item.id}.svg`} alt={item.name} />
              </div>
              <button
                onClick={() => {
                  addToCart(item.id)
                }}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {/* ⬇️ map through each cart item and return the li - but before that store the item info from store info into storeItem so we can have access to that data */}
            {cart.map(cartItem => {
              const storeItem = store.find(
                storeItem => (storeItem.id = cartItem.id)
              )
              console.log('result of find', storeItem)

              return (
                <li>
                  <img
                    className="cart--item-icon"
                    src={`assets/icons/${cartItem.id}.svg`}
                    alt={storeItem.name}
                  />
                  <p>{storeItem.name}</p>
                  <button className="quantity-btn remove-btn center">-</button>
                  <span className="quantity-text center">
                    {cartItem.quantity}
                  </span>
                  <button className="quantity-btn add-btn center">+</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  )
}
