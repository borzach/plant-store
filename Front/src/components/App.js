import { addCart, getCart } from "../apiService";
import Banner from "./Banner";
import Cart from "./Cart";
import Footer from "./Footer";
import ShoppingList from "./ShoppingList";
import { useEffect, useState, useCallback } from 'react';

function App() {
  // const savedCart = localStorage.getItem('cart');
  // savedCart? JSON.parse(savedCart):
  const [cart, updateCart] = useState({id: '', ownerId: '', productList: [], status: 'open'});
  const [loggedInUsr, updateLoggedIn] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCart = useCallback(async () => {
    const newCart = { id: '', ownerId: loggedInUsr.id, productList: [], status: 'open' };
    if (loggedInUsr.id) {
      getCart(loggedInUsr.id).then((serverCart) => {
        if (serverCart.length !== 0 && serverCart.status === 'open') {
          updateCart(serverCart);
        } else {
          try {
            addCart(newCart).then((nCart) => {
              updateCart(nCart);
            });
          } catch (error) {
              console.log(error);
          }
        }
      })
    }
}, [loggedInUsr]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
          await handleCart();
      } catch (error) {
          console.log(error);
      }
    };
    fetchCart();
  }, [loggedInUsr, handleCart]);

  return (
    <div>
      <Banner updateLoggedIn={updateLoggedIn} updateCart={updateCart}></Banner>
      <Cart cart={cart} updateCart={updateCart} handleCart={handleCart}/>
      <ShoppingList user={loggedInUsr} cart={cart} updateCart={updateCart}></ShoppingList>
      <Footer></Footer>
    </div>
  );
}

export default App;
