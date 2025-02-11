import { useState, useEffect } from "react";
import "./CSS/App.css";
import ProductCard from "./card/ProductCard";
import LoginModal from "./components/LoginModal"; // Importamos el modal

const App = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts
      ? JSON.parse(storedProducts)
      : [
          { id: 1, name: "Cafe Sello Rojo", price: 2000, imgSrc: "/cafe.jpg" },
          { id: 2, name: "Cafe Águila Roja", price: 2000, imgSrc: "/aguilaroja.jpg" },
          { id: 3, name: "Cafe instantaneo", price: 1800, imgSrc: "/instantaneo.jpg" },
        ];
  });

  const [cart, setCart] = useState([]);
  const [editingPrice, setEditingPrice] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = (username, password) => {
    if (username === "Dario03" && password === "supermercado09") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const startEditingPrice = (id, currentPrice) => {
    setEditingPrice({ id, price: currentPrice });
  };

  const handleUpdatePrice = () => {
    if (editingPrice.id && editingPrice.price) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingPrice.id
            ? { ...product, price: parseInt(editingPrice.price) }
            : product
        )
      );
      setEditingPrice({});
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">TIENDA DONDE DARÍO</h1>
        <p className="subtitle">Encuentra tus productos favoritos al mejor precio</p>
        <div className="login-container">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          ) : (
            <button className="login-open-btn" onClick={() => setIsModalOpen(true)}>Iniciar Sesión</button>
          )}
        </div>
      </header>

            {/* Carrito */}
            <div className="cart">
        <h2>🛒 Carrito de Compras</h2>
        {cart.length > 0 ? (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li className="cart-item" key={index}>
                <span>{item.name} - ${item.price} x {item.quantity}</span>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(index)}>➖</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>➕</button>
                </div>
                <button onClick={() => removeFromCart(index)}>🗑</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="color">No hay productos en el carrito.</p>
        )}
      </div>

      <div className="total-container">
        Total: <strong>${getTotal()}</strong>
      </div>

      {/* Modal de Login */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        handleLogin={handleLogin} 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
      />

      {/* Lista de productos */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <ProductCard name={product.name} price={product.price} imgSrc={product.imgSrc} />
            <button className="carro" onClick={() => addToCart(product)}>🛒</button>
            {isLoggedIn && (
              editingPrice.id === product.id ? (
                <div className="price-editor">
                  <input type="number" placeholder="Nuevo precio" value={editingPrice.price} onChange={(e) => setEditingPrice({ ...editingPrice, price: e.target.value })} />
                  <button className="confirm-button" onClick={handleUpdatePrice}>✔</button>
                </div>
              ) : (
                <button onClick={() => startEditingPrice(product.id, product.price)}>✏️</button>
              )
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;
