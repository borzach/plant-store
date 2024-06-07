import { useState, useEffect, useCallback } from 'react'
import '../styles/cart.css'
import { updateCartServer } from '../apiService';

function Cart({ cart, updateCart, handleCart }) {
	const [totalPrice, setTotal] = useState(0)
	const [isOpen, openCart] = useState(false)

	const calculateTotal = useCallback (() => {
		const total = cart.productList.reduce((acc, { price, amount }) => {
			return acc + price * amount;
		}, 0);
		setTotal(total);
		if (cart.id) {
			updateCartServer(cart.id, cart);
		}
	}, [cart]);

	useEffect(() => {
		calculateTotal();
		document.title = `LMJ: ${totalPrice}€ d'achats`
	}, [cart, calculateTotal, totalPrice]);
	function orderCart() {
		updateCart({...cart, status: 'ready'});
		handleCart();
	}

	return isOpen ? (
		<div className='cart'>
			<button className='btn-green' onClick={() => openCart(false)}>Fermer</button>
			<h2>Panier</h2>
			{cart.productList.map(({name, price, amount}, index) => (
                <div key={index}>{name} x {amount} - {price * (amount)}€</div>
            ))}
            <h3>Total : {totalPrice.toFixed(2)}€</h3>
			<div style={{display:'flex'}}>
				<button className='btn-white' onClick={() => updateCart({...cart, productList: []})}>Vider le panier</button>
				<button className='btn-white' onClick={() => orderCart()} >Commander</button>
			</div>
		</div>
	) : <div className='cart-closed'>
			<button className='btn-green' onClick={() => openCart(true)}>Ouvrir votre panier</button>
		</div>
}

export default Cart