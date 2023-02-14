import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  // navbar coponent for other pages

  return (
    <nav style={{ backgroundColor: "black" }}>
      <div className={styles.navWrapper}>
        <div className={styles.logoContainer}>

          <h1>
            <Link to="/" style={{textDecoration:"none" , color:"white"}}>Agro Mart</Link>
          </h1>
        </div>

        <div className={styles.toolsContainer}>
          <Link to="/create">
          <button className={styles.headerIcons}>
              <h3>
                <i class="fa-solid fa-plus"></i>{" "}
              </h3>
            </button>
          </Link>

          <Link to="/cart">
            <button className={styles.headerIcons}>
              <h3>
                <i class="fa-solid fa-cart-shopping"></i>
              </h3>
            </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
