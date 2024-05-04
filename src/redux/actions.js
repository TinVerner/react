export const NEXT_PAGE = 'NEXT_PAGE' // Действие для перехода на следующую страницу
export const PREV_PAGE = 'PREV_PAGE' // Действие для перехода на предыдущую страницу
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM' // Действие для обновления элемента корзины
export const ADD_CART_ITEM = 'ADD_CART_ITEM' // Действие для добавления элемента в корзину
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM' // Действие для удаления элемента из корзины
export const SET_DELIVERY_METHOD = 'SET_DELIVERY_METHOD' // Действие для установки метода доставки
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD' // Действие для установки метода оплаты
export const SET_DELIVERY_ADDRESS = 'SET_DELIVERY_ADDRESS' // Действие для установки адреса доставки
export const CONFIRM_ORDER = 'CONFIRM_ORDER' // Действие для подтверждения заказа

export const nextPage = () => ({
    type: NEXT_PAGE,
})

export const prevPage = () => ({
    type: PREV_PAGE,
})

export const updateCartItem = (id, data) => ({
    type: UPDATE_CART_ITEM,
    payload: { id, data },
})

export const addCartItem = data => ({
    type: ADD_CART_ITEM,
    payload: data,
})

export const removeCartItem = id => ({
    type: REMOVE_CART_ITEM,
    payload: { id },
})

export const setDeliveryMethod = method => ({
    type: SET_DELIVERY_METHOD,
    payload: { method },
})

export const setPaymentMethod = method => ({
    type: SET_PAYMENT_METHOD,
    payload: { method },
})

export const setDeliveryAddress = address => ({
    type: SET_DELIVERY_ADDRESS,
    payload: { address },
})

export const confirmOrder = order => ({
    type: CONFIRM_ORDER,
    payload: order,
})