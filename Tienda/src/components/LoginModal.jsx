import { useState } from "react";
import "../CSS/LoginModal.css";

const LoginModal = ({ isOpen, onClose, handleLogin, isLoggedIn, handleLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    if (handleLogin(username, password)) {
      onClose(); // Cierra el modal si el login es exitoso
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>×</span>
        {isLoggedIn ? (
          <div className="logged-in">
            <p>Bienvenido, <strong>Dario03</strong></p>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div className="login-form">
            <h3>Iniciar Sesión</h3>
            <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="login-btn" onClick={submitLogin}>Ingresar</button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default LoginModal;
