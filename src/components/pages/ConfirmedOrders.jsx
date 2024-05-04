import React from 'react' // Импорт модуля React для создания компонентов
import { connect } from 'react-redux' // Импорт функции connect из модуля react-redux для связывания компонента с Redux Store
import './ConfirmedOrders.css' // Импорт файла стилей для компонента ConfirmedOrders

const ConfirmedOrders = ({ orders = [] }) => { // Определение компонента ConfirmedOrders с принимаемым свойством orders
const calculateTotalPrice = cart => { // Определение функции calculateTotalPrice для расчета общей стоимости заказа
return cart.reduce((total, item) => total + item.cost * item.quantity, 0) // Использование метода reduce для суммирования стоимости каждого товара в корзине
}

return (
	<div className='orders-component'>
		<h2>Подтвержденные заказы</h2>
		<div className='orders'>
			{orders.map((order, index) => ( // Итерация по массиву заказов и отображение каждого заказа
				<div className='ordered-product' key={index}>
					<h3>Заказ №{index + 1}</h3>
					<p>
						<strong>Способ доставки:</strong>{' '}
						{order.deliveryMethod === 'courier'
							? 'Курьер'
							: order.deliveryMethod === 'mail'
							? 'Почта'
							: 'Самовывоз'}
					</p>
					<p>
						<strong>Способ оплаты:</strong>{' '}
						{order.paymentMethod === 'cash'
							? 'Наличными'
							: order.paymentMethod === 'card'
							? 'Банковская карта'
							: 'Банковский перевод'}
					</p>
					{order.deliveryMethod === 'pickup' ? null : ( // Проверка способа доставки и отображение адреса доставки, если не выбран самовывоз
						<p>
							<strong>Адрес доставки:</strong> {order.deliveryAddress}
						</p>
					)}
					<div className='ordered-products'>
						{order.cart.map(item => // Итерация по корзине товаров в заказе
							item.selected === true ? ( // Проверка выбора товара и его отображение, если выбран
								<div className='ordered-product'>
									<div className='description' key={item.id}>
										<span>{item.name}</span>
										<div>
											<img src={item.image} alt={item.name} />
										</div>
									</div>
								</div>
							) : null // Иначе, если товар не выбран, отображение null
						)}
					</div>
					<p>
						<strong>Общая стоимость заказа:</strong>{' '}
						{calculateTotalPrice(order.cart)} BYN.
					</p>
				</div>
			))}
		</div>
	</div>
)
}

const mapStateToProps = state => ({ // Определение функции mapStateToProps для получения заказов из состояния Redux Store
	orders: state.orders,
	})
	
	export default connect(mapStateToProps)(ConfirmedOrders) // Связывание компонента ConfirmedOrders с Redux Store с помощью функции connect и экспортирование связанного компонента по умолчанию