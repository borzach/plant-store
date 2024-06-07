//import { plantList } from "../data/plantList";
import { getAllPlants, API_BASE_URL } from "../apiService";
import "../styles/plant.css"
import CareScale from "./CareScale";
import { useEffect, useState, useCallback } from 'react'

function ShoppingList({ user, cart, updateCart }) {
    const [plantList, setPlants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllPlants();
                setPlants(result);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    const addProductToCart = useCallback((product) => {
        console.log("add product to cart");
        if (user.length !== 0) {
            updateCart(prevCart => ({
            ...prevCart,
            productList: [...prevCart.productList, product]
            }));
            console.log(cart);
        } else {
            alert("Créer vous un compte pour passer commande");
        }
    }, [updateCart, user, cart]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    function incrementCart(item) {
        const itemIndex = cart.productList.findIndex((product) => product.name === item.name);
        var newItem = { name: item.name, price: item.price, amount: 1 };
        
        if (itemIndex === -1) {
            addProductToCart(newItem);
        } else {
            const updatedProductList = cart.productList.map((product, index) => {
                if (index === itemIndex) {
                    return {...product, amount: product.amount + 1}
                }
                return product;
            });
            updateCart((prevCart) => ({
                ...prevCart,
                productList: updatedProductList,
            }));
        }
    }

    return (
        <div className="plant-list-container">
            <div className="error-message"></div>
			<ul className="plant-list">
				{plantList.map((plant) => (
					<li className="plant-item" key={plant.id}>
                        <span className='plant-item-price'>{plant.price}€</span>
                        <img className='plant-item-cover' src={API_BASE_URL + plant.cover} alt={`${plant.name} cover`}/>
                        <div>
                            {plant.name}
                            {plant.isBestSale ? <span>🔥</span> :null}
                        </div>
                        <CareScale careType='water' scaleValue={plant.water} />
                        <CareScale careType='light' scaleValue={plant.light} />
                        <button className="btn-green" onClick={() => incrementCart(plant)}>Ajouter</button>
                    </li>
				))}
			</ul>
		</div>
    );
}

export default ShoppingList;