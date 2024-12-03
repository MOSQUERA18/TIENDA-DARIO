import { useState } from 'react';
import './CSS/App.css';
import ProductCard from './card/ProductCard';

const App = () => {
    // Datos de productos
    const [products, setProducts] = useState([
        { id: 1, name: 'Café Sello Rojo', price: 2000, imgSrc: '/cafe.jpg' },
        { id: 2, name: 'Café Águila Roja', price: 2500, imgSrc: '/cafe.jpg' },
        { id: 3, name: 'Café Juan Valdez', price: 4000, imgSrc: '/cafe.jpg' },
        { id: 4, name: 'Café Oma', price: 3500, imgSrc: '/cafe.jpg' },
        { id: 5, name: 'Café Buendía', price: 3000, imgSrc: '/cafe.jpg' },
    ]);

    // Estado de búsqueda
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filtrar productos por nombre y precio
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
        return matchesSearch && matchesPrice;
    });

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <h1 className="title">TIENDA DONDE DARÍO</h1>
                <p className="subtitle">Encuentra tus productos favoritos al mejor precio</p>
            </header>

            {/* Filtros */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio mínimo"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio máximo"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Lista de productos */}
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            imgSrc={product.imgSrc}
                        />
                    ))
                ) : (
                    <p className="no-results">No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};

export default App;
