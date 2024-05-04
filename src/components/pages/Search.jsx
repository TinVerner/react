import React, { useState } from 'react';
import './search.css';

export const Search = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExactMatch, setIsExactMatch] = useState(false);
    const filteredProducts = products.filter(product =>
        isExactMatch
            ? product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            : product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-container">
            <input type="text" 
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Поиск по наименованию товара"
            />
            <input 
                type="checkbox" 
                className="search-checkbox"  
                checked={isExactMatch} 
                onChange={e => setIsExactMatch(e.target.checked)} />
                Точное совпадение
            <div className="search-results">
                {filteredProducts.map(product => (
                    <div className="search-product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        
                        <p>
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
                            </p>
                        <p>Описание: {product.description}</p>
                        <p>Количество: {product.quantity} шт.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};