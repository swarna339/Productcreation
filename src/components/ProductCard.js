import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  addToFavAsyncThunk,
  deleteFromFavAsyncThunk,
  getItemsFromcart,
  getMovieAsyncThunk,
} from "../features/products/productSlice";

import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // hold the products in cart from redux tookit state
  const cartItmes = useSelector(getItemsFromcart);

  // will take you to a detail page with a id of product
  function getProductDetails(product) {
    return navigate(`/detail/${product.id}`);
  }

  // to chekc is the movie is in cart or not
  let result = false;

  function checkFav(id) {
    // avoiding throwing error when iterating undefined ;
    if (cartItmes != undefined) {
      // check the id matches the favourtes list id
      cartItmes.map((item) => {
        if (item.id === id) {
          result = true;
        }
      });
    }
    // return true or false
    return result;
  }

  checkFav();

  return (
    <div className="productCard">
      <div className="imageContainer">
        <img
          src={product.url}
          onClick={() => {
            getProductDetails(product);
          }}
        />
      </div>

      <div className="infoContaienr">
        <div
          onClick={() => {
            getProductDetails(product);
          }}
        >
          <h3>{product.name}</h3>
        </div>

        <div className="priceRatingContainer">
          <div>{product.price}$</div>
          <div>
            <button
              // favbutton
              className="favButton"
              onClick={() => {
                if (checkFav(product.id)) {
                  // delets
                  const deletFromFavourites = async () => {
                    const result = await dispatch(
                      deleteFromFavAsyncThunk(product)
                    );
                  };

                  deletFromFavourites();
                } else {
                  // add to fav
                  const addtofav = async () => {
                    const result = await dispatch(
                      addToFavAsyncThunk({ ...product, quantity: 1 })
                    );
                  };
                  addtofav();
                }
              }}
            >
              {/* buttons for fav and non fav products */}
              {checkFav(product.id) ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
