import React, { useState } from 'react';
import { Search, SortTable, Catalog, Home} from "./components/pages";
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import './app.css'
import OrderForm from "./components/pages/OrderForm";
import products from "./products";
const App = () => {

  return (
      <div className="App">
        <header>
          <Navbar/>
        </header>
        <main>
          <Routes>
            <Route path="/SortTable" element={<SortTable products={products}/>}/>
            <Route path="/Catalog" element={<Catalog products={products} />}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/Search" element={<Search products={products}/>}/>
            <Route path="/Order" element={<OrderForm/>}/>
          </Routes>
        </main>
      </div>

  );
}
export default App;
