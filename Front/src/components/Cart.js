import { useState, useEffect, useCallback } from 'react'
import '../styles/cart.css'

function Cart({ cart, updateCart }) {
	const [totalPrice, setTotal] = useState(0)
	const [isOpen, openCart] = useState(false)

	const calculateTotal = useCallback (() => {
		console.log(cart);
		const total = cart.productList.reduce((acc, { price, amount }) => {
			return acc + price * amount;
		}, 0);
		setTotal(total);
	}, [cart]);

	useEffect(() => {
		calculateTotal();
		document.title = `LMJ: ${totalPrice}€ d'achats`
	}, [cart, calculateTotal, totalPrice]);
	
	return isOpen ? (
		<div className='cart'>
			<button className='btn-white' onClick={() => openCart(false)}>Fermer</button>
			<h2>Panier</h2>
			{cart.productList.map(({name, price, amount}, index) => (
                <div key={index}>{name} x {amount} - {price * (amount)}€</div>
            ))}
            <h3>Total : {totalPrice.toFixed(2)}€</h3>
            <button className='btn-white' onClick={() => updateCart({...cart, productList: []})}>Vider le panier</button>
		</div>
	) : <div className='cart-closed'>
			<button className='btn-green' onClick={() => openCart(true)}>Ouvrir votre panier</button>
		</div>
}

export default Cart