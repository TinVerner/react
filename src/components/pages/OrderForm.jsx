
import React from 'react'
import { connect } from 'react-redux'

import ProductsPage from './ProductsPage'
import DeliveryPaymentPage from './DeliveryPaymentPage'
import './OrderForm.css'
import {nextPage, prevPage} from "../../redux/actions";

const OrderForm = ({ currentPage, nextPage, prevPage }) => {
	return (
		<div className='order'>
			{currentPage > 1 && (
				<button className='sort-button' onClick={prevPage}>
					Назад
				</button>
			)}
			{currentPage < 2 && (
				<button className='sort-button' onClick={nextPage}>
					Далее
				</button>
			)}
			{currentPage === 1 && <ProductsPage />}
			{currentPage === 2 && <DeliveryPaymentPage />}
		</div>
	)
}

const mapStateToProps = state => ({
	currentPage: state.currentPage,
})

const mapDispatchToProps = dispatch => ({
	nextPage: () => dispatch(nextPage()),
	prevPage: () => dispatch(prevPage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
