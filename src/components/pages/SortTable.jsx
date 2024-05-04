import React, { useState } from 'react';
import './sorttable.css';

const Product = ({ product }) => (
  <tr>
    <td><img src={product.image} alt={product.name} width="50px" height="50px" /></td>
    <td>{product.name}</td>
    <td>{product.description}</td>
    <td>{product.cost}</td>
    <td>{product.quantity}</td>
    <td>{product.isNew ? 'Да' : 'Нет'}</td>
    <td>{product.discount}%</td>
  </tr>
);

export const SortTable = ({ products }) => {
  const [sortField, setSortField] = useState('name');
  const [isAscending, setIsAscending] = useState(true);
  const sortedProducts = [...products].sort((a, b) =>
    isAscending ? (a[sortField] > b[sortField] ? 1 : -1) : (a[sortField] < b[sortField] ? 1 : -1)
  );
  return (
    <div>
      <button className="sort-button" onClick={() => { setSortField('name'); setIsAscending(!isAscending) }}>Сортировать по наименованию</button>
      <button className="sort-button" onClick={() => { setSortField('cost'); setIsAscending(!isAscending) }}>Сортировать по стоимости</button>
      <button className="sort-button" onClick={() => { setSortField('quantity'); setIsAscending(!isAscending) }}>Сортировать по количеству</button>
      <button className="sort-button" onClick={() => { setSortField('discount'); setIsAscending(!isAscending) }}>Сортировать по скидке</button>
      <table className="sort-table">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Стоимость, BYN</th>
            <th>Количество</th>
            <th>Новинка</th>
            <th>Скидка</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => <Product key={product.id} product={product} />)}
        </tbody>
      </table>
    </div>
  );
};