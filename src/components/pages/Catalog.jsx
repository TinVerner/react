import React, { useState } from 'react'; // Импорт модуля React и функции useState для создания компонентов и работы с состоянием
import './catalog.css'; // Импорт файла стилей для компонента Catalog
import { useDispatch, useSelector } from "react-redux"; // Импорт функций useDispatch и useSelector из модуля react-redux для работы с Redux Store
import { addCartItem } from "../../redux/actions"; // Импорт функции addCartItem из модуля redux/actions

const Product = ({ product }) => { // Определение компонента Product с принимаемым свойством product
const dispatch = useDispatch(); // Получение функции dispatch из хука useDispatch
const cart = useSelector(state => state.cart); // Получение состояния cart из Redux Store с помощью хука useSelector
const addToCart = product => { // Определение функции addToCart, добавляющей товар в корзину
    const isInCart = cart.some(item => item.id === product.id); // Проверка, находится ли товар уже в корзине
    if (isInCart) { // Если товар уже в корзине, ничего не делать
        return;
    }
    dispatch(addCartItem(product)); // Добавление товара в корзину с помощью функции addCartItem и dispatch
}

return (
    <div id="product">
        <img src={product.image} alt={product.name} width="230px" height="230px" />
        <h2>{product.name}</h2>
        {product.discount > 0 ? ( // Проверка наличия скидки на товар и отображение цены с учетом скидки
            <p>
                <span className="discounted-cost">
                    {(product.cost * (1 - product.discount / 100)).toFixed(2)} BYN
                </span>
                <span className="original-cost">{product.cost} BYN</span>
            </p>
        ) : (
            <p>{product.cost} BYN</p> // Отображение цены товара без скидки
        )}

        <p>{product.description} Вес торта {product.weight} кг.</p>
        <p>Количество: {product.quantity} шт.</p>
        {product.discount > 0 && <p>Скидка: {product.discount}%</p>}
        {product.isNew && <p className="new">Новинка!</p>}
        {/* // Кнопка "Добавить в корзину" с обработчиком события onClick, вызывающим функцию addToCart */}
        <button className="sort-button" onClick={() => addToCart(product)}>
        {/* // Отображение текста на кнопке в зависимости от наличия товара в корзине */}
            {cart.some(item => item.id === product.id) ? 'Добавлено' : 'Добавить в корзину'}
        </button>
    </div>
);
};

const Sort = ({ products, sortField, setSortField }) => { // Определение компонента Sort с принимаемыми свойствами products, sortField и setSortField
    const [isAscending, setIsAscending] = useState(true); // Определение состояния isAscending с начальным значением true с помощью хука useState

    const sortedProducts = [...products].sort((a, b) => // Сортировка списка товаров в зависимости от выбранного поля с учетом порядка сортировки
    isAscending ? (a[sortField] > b[sortField] ? 1 : -1) : (a[sortField] < b[sortField] ? 1 : -1)
);

return (
    <div>
        <div className="buttons">
            <button
                className="sort-button"
                onClick={() => {
                    setSortField('name'); // Установка полясортировки на "name" и изменение порядка сортировки
                    setIsAscending(!isAscending);
                }}
            >
                Сортировать по наименованию
            </button>
            <button
                className="sort-button"
                onClick={() => {
                    setSortField('cost'); // Установка поля сортировки на "cost" и изменение порядка сортировки
                    setIsAscending(!isAscending);
                }}
            >
                Сортировать по стоимости
            </button>
            <button
                className="sort-button"
                onClick={() => {
                    setSortField('quantity'); // Установка поля сортировки на "quantity" и изменение порядка сортировки
                    setIsAscending(!isAscending);
                }}
            >
                Сортировать по количеству
            </button>
            <button
                className="sort-button"
                onClick={() => {
                    setSortField('discount'); // Установка поля сортировки на "discount" и изменение порядка сортировки
                    setIsAscending(!isAscending);
                }}
            >
                Сортировать по скидке
            </button>
        </div>
        <div className="products-container">
            {sortedProducts.map((product) => (
                <Product key={product.id} product={product} /> // Отображение списка отсортированных товаров с использованием компонента Product
            ))}
        </div>
    </div>
);
};

export const Catalog = ({ products }) => { // Определение компонента Catalog с принимаемым свойством products
    const [sortField, setSortField] = useState('name'); // Определение состояния sortField с начальным значением "name" с помощью хука useState

    return (
        <Sort products={products} sortField={sortField} setSortField={setSortField} /> // Отображение компонента Sort с передачей свойств products, sortField и setSortField
    );
};