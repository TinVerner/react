import { combineReducers } from 'redux'

// Импорт типов действий
import {
    NEXT_PAGE,
    PREV_PAGE,
    ADD_CART_ITEM,
    UPDATE_CART_ITEM,
    REMOVE_CART_ITEM,
    SET_DELIVERY_METHOD,
    SET_PAYMENT_METHOD,
    SET_DELIVERY_ADDRESS,
    CONFIRM_ORDER,
} from './actions'

// Редуктор для обновления текущей страницы
const currentPageReducer = (state = 1, action) => {
    switch (action.type) {
        case NEXT_PAGE:
            return state + 1; // Увеличение номера текущей страницы на 1
        case PREV_PAGE:
            return state - 1; // Уменьшение номера текущей страницы на 1
        default:
            return state;
    }
}

// Редуктор для управления состоянием корзины
const cartReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_CART_ITEM: {
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload.data } // Обновление данных элемента
                    : item
            );
        }
        case ADD_CART_ITEM: {
            return [...state, action.payload]; // Добавление элемента в корзину
        }
        case REMOVE_CART_ITEM: {
            return state.filter(item => item.id !== action.payload.id); // Удаление элемента из корзины
        }
        case CONFIRM_ORDER:
            return []; // Очистка корзины после подтверждения заказа
        default: {
            return state;
        }
    }
}

// Редуктор для установки метода доставки
const deliveryMethodReducer = (state = 'courier', action) => {
    switch (action.type) {
        case SET_DELIVERY_METHOD:
            return action.payload.method; // Установка нового метода доставки
        default:
            return state;
    }
}

// Редуктор для установки метода оплаты
const paymentMethodReducer = (state = 'cash', action) => {
    switch (action.type) {
        case SET_PAYMENT_METHOD:
            return action.payload.method; // Установка нового метода оплаты
        default:
            return state;
    }
}

// Редуктор для установки адреса доставки
const deliveryAddressReducer = (state = '', action) => {
    switch (action.type) {
        case SET_DELIVERY_ADDRESS:
            return action.payload.address; // Установка нового адреса доставки
        default:
            return state;
    }
}

// Редуктор для управления состоянием заказов
const ordersReducer = (state = [], action) => {
    switch (action.type) {
        case CONFIRM_ORDER:
            return [...state, action.payload]; // Добавление нового заказа
        default:
            return state;
    }
}

// Комбинирование редукторов в корневой редуктор
const rootReducer = combineReducers({
    currentPage: currentPageReducer, // Редуктор для управления текущей страницей
    cart: cartReducer, // Редуктор для управления корзиной
    deliveryMethod: deliveryMethodReducer, // Редуктор для установки метода доставки
    paymentMethod: paymentMethodReducer, // Редуктор для установки метода оплаты
    deliveryAddress: deliveryAddressReducer, // Редуктор для установки адреса доставки
    orders: ordersReducer, // Редуктор для управления состоянием заказов
})

export default rootReducer;