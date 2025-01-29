import React from "react";
import "./Header.css"; // Archivo CSS para estilos

const Header = () => {
  return (
    
    <div className="header-containerr">
      <div className="search-bar">
        <span className="search-icon"><i class='bx bx-search-alt-2'></i></span>
        <input type="text" placeholder="Search" className="search-input" />
      </div>
    </div>
  );
};

export default Header;
