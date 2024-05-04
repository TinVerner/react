import React from 'react'
import { connect } from 'react-redux'
import { updateCartItem, removeCartItem } from "../../redux/actions";
import { useState, useEffect } from 'react'
import './ProductsPage.css'
import products from "../../products";

const ProductsPage = ({ cart, updateCartItem, removeCartItem }) => {
	// состояние для счётчиков товаров
	const [quantityValues, setQuantityValues] = useState({})

	// состояние для общей цены
	const [totalPrices, setTotalPrices] = useState({})
	const [totalCartPrice, setTotalCartPrice] = useState(0)

	// Вычисление суммы для каждого товара и общей суммы корзины
	useEffect(() => {
		const updatedTotalPrices = {}
		let cartTotalPrice = 0

		cart.forEach(item => {
			if (item.selected) {
				const product = products.find(prod => prod.id === item.id)
				const quantity = quantityValues[item.id] || 1
				const totalPrice = quantity * product.cost
				updatedTotalPrices[item.id] = totalPrice
				cartTotalPrice += totalPrice
			}
		})

		setTotalPrices(updatedTotalPrices)
		setTotalCartPrice(cartTotalPrice)
	}, [cart])

	// обработчик счётчиков количества товаров
	const handleQuantityChange = (id, quantity) => {
		const itemProd = products.find(prod => prod.id === id)
		if (quantity >= 1 && quantity <= itemProd.quantity) {
			setQuantityValues(prevState => ({
				...prevState,
				[id]: quantity,
			}))
			updateCartItem(id, { quantity, selected: true })
		}
	}

	const handleCheckboxChange = (id, selected) => {
		updateCartItem(id, { selected })
	}

	return (
		<div>
			<h1>Корзина</h1>
			<div className="center">
				Общая сумма корзины: {totalCartPrice} BYN
			</div>
			<div className='products-container' >
				{cart.map(item => (
					<div id="product" key={item.id}>
						<input
							type='checkbox' 
							checked={item.selected}
							onChange={() => handleCheckboxChange(item.id, !item.selected)}
						/>
						
						<div>
							<img src={item.image} alt={item.name} />
						</div>
						<h2>{item.name}</h2>
						<input
							type='number'
							value={quantityValues[item.id] || 1}
							onChange={e =>
								handleQuantityChange(item.id, parseInt(e.target.value))
							}
						/>
						<p>
							Доступное количество:{' '}
							{products.find(prod => prod.id === item.id).quantity}
						</p>
						<p><span className="bold">Сумма: </span> {totalPrices[item.id]} BYN</p>
						<button className = "sort-button" onClick={() => removeCartItem(item.id)}>Удалить</button>
					</div>
				))}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
	updateCartItem: (id, data) => dispatch(updateCartItem(id, data)),
	removeCartItem: id => dispatch(removeCartItem(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
