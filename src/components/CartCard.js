import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { deleteFromFavAsyncThunk } from "../features/products/productSlice";

import styles from "../styles/CartCard.module.css";

function CartCard({ product }) {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function getProductDetails(product) {
    navigate(`/detail/${product.id}`);

    return;
  }

  return (
    <>
      {/* item cards in cart compaonent */}
      <div
        // hovering feature for x delete button
        className={styles.cartCardWrapper}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
      >
        {/* on clikc will take use to detail */}
        <div className={styles.imageContainer}>
          <img src={product.url} onClick={() => getProductDetails(product)} />
        </div>

        <div className={styles.detailsContainer}>
          <div className="nameContainer">
            <h3>{product.name}</h3>
          </div>

          <div className="quantityWrapper">
            <div className="sizepriceWrapper">
              <div className="priceContainer">
                <h3>{product.price}</h3>
              </div>
            </div>
          </div>
          {/* delete button dispatched delte action from redux toolkit  */}
          {isHover ? (
            <button
              className={styles.delButton}
              onClick={() => {
                dispatch(deleteFromFavAsyncThunk(product));
              }}
            >
              <i class="fa-solid fa-x"></i>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CartCard;
