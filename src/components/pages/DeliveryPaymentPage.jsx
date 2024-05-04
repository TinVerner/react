import React from 'react' // Импорт React для создания компонентов
import { connect } from 'react-redux' // Импорт функции connect из пакета react-redux для связи компонента с Redux
import {
	setDeliveryMethod, // Импорт действия setDeliveryMethod из файла с Redux-действиями
	setPaymentMethod, // Импорт действия setPaymentMethod из файла с Redux-действиями
	setDeliveryAddress, // Импорт действия setDeliveryAddress из файла с Redux-действиями
	confirmOrder, // Импорт действия confirmOrder из файла с Redux-действиями
} from "../../redux/actions"; // Импорт набора действий из файла с Redux-действиями
import ConfirmedOrders from './ConfirmedOrders' // Импорт компонента ConfirmedOrders из файла './ConfirmedOrders'
import './DeliveryPaymentPage.css' // Импорт стилей для компонента DeliveryPaymentPage

const DeliveryPaymentPage = ({
	deliveryMethod, // Свойство из состояния Redux, представляющее выбранный способ доставки
	paymentMethod, // Свойство из состояния Redux, представляющее выбранный способ оплаты
	deliveryAddress, // Свойство из состояния Redux, представляющее адрес доставки
	setDeliveryMethod, // Функция для обновления выбранного способа доставки в состоянии Redux
	setPaymentMethod, // Функция для обновления выбранного способа оплаты в состоянии Redux
	setDeliveryAddress, // Функция для обновления адреса доставки в состоянии Redux
	confirmOrder, // Функция для подтверждения заказа с переданными данными
	cart, // Массив товаров в корзине из состояния Redux
	orders, // Массив подтвержденных заказов из состояния Redux
}) => {
	const handleConfirmOrder = () => {
		const order = {
			deliveryMethod, // Выбранный способ доставки
			paymentMethod, // Выбранный способ оплаты
			deliveryAddress, // Адрес доставки
		}

		if (!deliveryAddress && deliveryMethod !== 'pickup') {
			alert('Адрес доставки не указан.') // Вывод предупреждения, если адрес доставки не указан и выбран способ доставки, отличный от самовывоза
			return
		}

		if (
			cart.length === 0 || // Если корзина пуста
			!cart.find(item => (!!item.selected)) // Если ни один товар в корзине не выбран
		) {
			alert('Ваша корзина пуста или товары не выбраны.') // Вывод предупреждения о пустой корзине или отсутствии выбранных товаров
			return
		}

		const orderWithCart = { ...order, cart } // Создание объекта заказа, включающего выбранные товары
		confirmOrder(orderWithCart) // Вызов функции подтверждения заказа с переданными данными

		setDeliveryMethod('courier') // Установка способа доставки по умолчанию в состоянии Redux
		setPaymentMethod('cash') // Установка способа оплаты по умолчанию в состоянии Redux
		setDeliveryAddress('') // Очистка адреса доставки в состоянии Redux
	}

	return (
		<div className='order-second'>
			<div className='delivery-method'>
				<h2>Выберите способ доставки</h2>
				<input
					type='radio'
					value='courier'
					checked={deliveryMethod === 'courier'} // Проверка, является ли выбранный способ доставки "courier"
					onChange={() => setDeliveryMethod('courier')} // Вызов функции setDeliveryMethod при изменении выбранного способа доставки
				/>{' '}
				<label>Курьером</label>
				<br />
				<input
					type='radio'
					value='mail'
					checked={deliveryMethod === 'mail'} // Проверка, является ли выбранный способ доставки "mail"
					onChange={() => setDeliveryMethod('mail')} // Вызов функции setDeliveryMethod при изменении выбранного способа доставки
				/>{' '}
				<label>Почтой</label>
				<br />
				<input
					type='radio'
					value='pickup'
					checked={deliveryMethod === 'pickup'} // Проверка, является ли выбранный способ доставки "pickup"
					onChange={() => setDeliveryMethod('pickup')} // Вызов функции setDeliveryMethod при изменении выбранного способа доставки
				/>{' '}
				<label>Самовывоз</label>
				<br />
				{deliveryMethod !== 'pickup' && ( // Проверка, выбран ли способ доставки, отличный от самовывоза
					<div>
						<h2>Адрес доставки</h2>
						<input
							type='text'
							value={deliveryAddress} // Значение адреса доставки
							onChange={e => setDeliveryAddress(e.target.value)} // Вызов функции setDeliveryAddress при изменении адреса доставки
						/>
					</div>
				)}
			</div>
			<div className='payment-method'>
				<h2>Выберите способ оплаты</h2>
				<input
					type='radio'
					value='cash'
					checked={paymentMethod === 'cash'} // Проверка, является ли выбранный способ оплаты "cash"
					onChange={() => setPaymentMethod('cash')} // Вызов функции setPaymentMethod при изменении выбранного способа оплаты
				/>{' '}
				<label>Наличными</label>
				<br />
				<input
					type='radio'
					value='card'
					checked={paymentMethod === 'card'} // Проверка, является ли выбранный способ оплаты "card"
					onChange={() => setPaymentMethod('card')} // Вызов функции setPaymentMethod при изменении выбранного способа оплаты
				/>{' '}
				<label>Банковской картой</label>
				<br />
				<input
					type='radio'
					value='bankTransfer'
					checked={paymentMethod === 'bankTransfer'} // Проверка, является ли выбранный способ оплаты "bankTransfer"
					onChange={() => setPaymentMethod('bankTransfer')} // Вызов функции setPaymentMethod при изменении выбранного способа оплаты
				/>{' '}
				<label>Банковским переводом</label>
				<br />
			</div>
			<button className='sort-button' onClick={handleConfirmOrder}>
				Подтвердить заказ
			</button>
			{/* Рендер компонента ConfirmedOrders со списком подтвержденных заказов */}
			<ConfirmedOrders orders={orders} />
		</div>
	)
}

const mapStateToProps = state => ({
	deliveryMethod: state.deliveryMethod, // Получение выбранного способа доставки из состояния Redux
	paymentMethod: state.paymentMethod, // Получение выбранного способа оплаты из состояния Redux
	deliveryAddress: state.deliveryAddress, // Получение адреса доставки из состояния Redux
	cart: state.cart, // Получение списка товаров в корзине из состояния Redux
	orders: state.orders, // Получение списка подтвержденных заказов из состояния Redux
})

const mapDispatchToProps = dispatch => ({
	setDeliveryMethod: method => dispatch(setDeliveryMethod(method)), // Привязка функции setDeliveryMethod к действию setDeliveryMethod и передача метода в действие
	setPaymentMethod: method => dispatch(setPaymentMethod(method)), // Привязка функции setPaymentMethod к действию setPaymentMethod и передача метода в действие
	setDeliveryAddress: address => dispatch(setDeliveryAddress(address)), // Привязка функции setDeliveryAddress к действию setDeliveryAddress и передача адреса в действие
	confirmOrder: order => dispatch(confirmOrder(order)) // Привязка функции confirmOrder к действию confirmOrder и передача заказа в действие
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryPaymentPage) // Подключение компонента DeliveryPaymentPage к Redux Store с помощью функции connect, передавая функции mapStateToProps и mapDispatchToProps в качестве аргументов. Затем экспортирование связанного компонента по умолчанию.