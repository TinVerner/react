import React, { useState } from 'react';
import './catalog.css';
import {useDispatch, useSelector} from "react-redux";
import {addCartItem} from "../../redux/actions";


const Product = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const addToCart = product => {
        const isInCart = cart.some(item => item.id === product.id)
        if (isInCart) {
            return
        }
        dispatch(addCartItem(product))
    }


    return (
    <div id="product">
        <img src={product.image} alt={product.name} width="230px" height="230px" />
        <h2>{product.name}</h2>
        {product.discount > 0 ? (
            <p>
        <span className="discounted-cost">
          {(product.cost * (1 - product.discount / 100)).toFixed(2)} BYN
        </span>
                <span className="original-cost">{product.cost} BYN</span>
            </p>
        ) : (
            <p>{product.cost} BYN</p>
        )}
        
        <p>{product.description} Вес торта {product.weight} кг.</p>
        <p>Количество: {product.quantity} шт.</p>
        {product.discount > 0 && <p>Скидка: {product.discount}%</p>}
        {product.isNew && <p className="new">Новинка!</p>}

        <button className= "sort-button" onClick={() => addToCart(product)}>
            {cart.some(item => item.id === product.id)
                ? 'Добавлено'
                : 'Добавить в корзину'}
        </button>
    </div>
)};

const Sort = ({ products, sortField, setSortField }) => {
    const [isAscending, setIsAscending] = useState(true);

    const sortedProducts = [...products].sort((a, b) =>
        isAscending ? (a[sortField] > b[sortField] ? 1 : -1) : (a[sortField] < b[sortField] ? 1 : -1)
    );

    return (
        <div>
            <div className="buttons">
                <button
                    className="sort-button"
                    onClick={() => {
                        setSortField('name');
                        setIsAscending(!isAscending);
                    }}
                >
                    Сортировать по наименованию
                </button>
                <button
                    className="sort-button"
                    onClick={() => {
                        setSortField('cost');
                        setIsAscending(!isAscending);
                    }}
                >
                    Сортировать по стоимости
                </button>
                <button
                    className="sort-button"
                    onClick={() => {
                        setSortField('quantity');
                        setIsAscending(!isAscending);
                    }}
                >
                    Сортировать по количеству
                </button>
                <button
                    className="sort-button"
                    onClick={() => {
                        setSortField('discount');
                        setIsAscending(!isAscending);
                    }}
                >
                    Сортировать по скидке
                </button>
            </div>
            <div className="products-container">
                {sortedProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export const Catalog = ({ products }) => {
    const [sortField, setSortField] = useState('name');


    return (
        <Sort products={products} sortField={sortField} setSortField={setSortField} />
    );
};