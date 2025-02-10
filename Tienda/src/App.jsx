// src/App.js
import { useState, useEffect } from "react";
import "./CSS/App.css";
import ProductCard from "./card/ProductCard";

const App = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts
      ? JSON.parse(storedProducts)
      : [
          { id: 1, name: "Cafe Sello Rojo", price: 2000, imgSrc: "/cafe.jpg" },
          { id: 2, name: "Cafe Águila Roja", price: 2000, imgSrc: "/aguilaroja.jpg" },
          { id: 3, name: "Cafe instantaneo", price: 1800, imgSrc: "/instantaneo.jpg" },
          // { id: 4, name: "Café Oma", price: 3500, imgSrc: "/" },
          // { id: 5, name: "Café Buendía", price: 3000, imgSrc: "/" },
        ];
  });

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingPrice, setEditingPrice] = useState({}); // Estado para editar precios
  const [cart, setCart] = useState([]); // Estado para almacenar los productos seleccionados
  const [notification, setNotification] = useState(''); // Estado para las notificaciones



  // Guardar productos actualizados en localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

    // Mostrar una notificación temporal
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000); // Limpiar después de 3 segundos
    };


  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

    // Eliminar producto del carrito
    const removeFromCart = (index) => {
        const productName = cart[index].name;
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
        showNotification(`${productName} eliminado del carrito.`);
    };



  // Calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  // Iniciar edición del precio
  const startEditingPrice = (id, currentPrice) => {
    setEditingPrice({ id, price: currentPrice });
  };

  // Confirmar y actualizar el precio
  const handleUpdatePrice = () => {
    if (editingPrice.id && editingPrice.price) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingPrice.id
            ? { ...product, price: parseInt(editingPrice.price) }
            : product
        )
      );
      setEditingPrice({}); // Limpiar estado de edición
    }
  };

  // Filtrar productos según la búsqueda y precios
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice =
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">TIENDA DONDE DARÍO</h1>
        <p className="subtitle">
          Encuentra tus productos favoritos al mejor precio
        </p>
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

            {/* Carrito */}
            <div className="cart">
                <h2 className="color">Carrito de Compras</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li className="color" key={index}>
                                {item.name} - ${item.price}{' '}
                                {/* BOTON DE ELIMINAR */}
                                <button onClick={() => removeFromCart(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>

                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="color">No hay productos en el carrito.</p>
                    
                )}
            </div>
            
      <h3 className="color">Total: ${getTotal()}</h3>


      {/* Lista de productos */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard
                name={product.name}
                price={product.price}
                imgSrc={product.imgSrc}
              />
              <button className="carro" onClick={() => addToCart(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </button>
              {editingPrice.id === product.id ? (
                <div className="price-editor">
                  <input
                    type="number"
                    placeholder="Nuevo precio"
                    value={editingPrice.price}
                    onChange={(e) =>
                      setEditingPrice({
                        ...editingPrice,
                        price: e.target.value,
                      })
                    }
                  />
                  {/* EDITAR PRECIO DEL PRODUCTO */}
                  <button onClick={handleUpdatePrice}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditingPrice(product.id, product.price)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default App;
