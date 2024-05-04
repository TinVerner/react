import React from 'react' // Импорт модуля React для создания компонентов
import { connect } from 'react-redux' // Импорт функции connect из модуля react-redux для связывания компонента с Redux Store

import ProductsPage from './ProductsPage' // Импорт компонента ProductsPage
import DeliveryPaymentPage from './DeliveryPaymentPage' // Импорт компонента DeliveryPaymentPage
import './OrderForm.css' // Импорт файла стилей для компонента OrderForm
import { nextPage, prevPage } from "../../redux/actions"; // Импорт функций nextPage и prevPage из модуля redux/actions

const OrderForm = ({ currentPage, nextPage, prevPage }) => { // Определение компонента OrderForm с принимаемыми свойствами currentPage, nextPage и prevPage
return (
<div className='order'>
{currentPage > 1 && ( // Проверка текущей страницы и отображение кнопки "Назад", если текущая страница больше 1
//  Отображение кнопки "Назад" с обработчиком события onClick, вызывающим функцию prevPage
<button className='sort-button' onClick={prevPage}>
Назад
</button>
)}
{currentPage < 2 && ( // Проверка текущей страницы и отображение кнопки "Далее", если текущая страница меньше 2
 // Отображение кнопки "Далее" с обработчиком события onClick, вызывающим функцию nextPage
<button className='sort-button' onClick={nextPage}>
Далее
</button>
)}
{/* // Отображение компонента ProductsPage, если текущая страница равна 1 */}
{currentPage === 1 && <ProductsPage />}
{/* // Отображение компонента DeliveryPaymentPage, если текущая страница равна 2 */}
{currentPage === 2 && <DeliveryPaymentPage />}
</div>
)
}

const mapStateToProps = state => ({ // Определение функции mapStateToProps для получения текущей страницы из состояния Redux Store
currentPage: state.currentPage,
})

const mapDispatchToProps = dispatch => ({ // Определение функции mapDispatchToProps для связывания действий nextPage и prevPage с функцией dispatch
nextPage: () => dispatch(nextPage()),
prevPage: () => dispatch(prevPage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm) // Связывание компонента OrderForm с Redux Store с помощью функции connect и экспортирование связанного компонента по умолчанию