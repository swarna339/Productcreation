import React, { useState } from "react";

import { CartCard, Navbar } from "../components/index";

import { useSelector } from "react-redux";

import { getItemsFromcart } from "../features/products/productSlice";

import "../styles/Cart.css";

function Cart() {
  // list fo cart items
  let cartItems = useSelector(getItemsFromcart);
  const [useDiscound, setUseDiscound] = useState(false);
  

  function GetCartItmes() {
    cartItems = useSelector(getItemsFromcart);
  }

  // totals to strore the cart total
  let total = 0;
  let eligibleDisound = 0;

  // iterates and returns a llist/

  function renderCartItems(cartItems) {
    if (cartItems != undefined) {
      const renderedItems = cartItems.map((product) => {
        // total is getting added
        total += parseInt(product.price);

        return <CartCard product={product} />;
      });
      return renderedItems;
    }
  }

  function eligibleDidcounds() {
    // check the discoudns
    let disounds = "";
    if (total > 1000) {
      if (total > 2000) {
        // displays the discounds
        disounds = (
          // disound 1
          <p>
            Get <strong>{"20%"}</strong> offer of <strong>{total / 5}</strong>$
            on top of your <strong>{total}$</strong>
          </p>
        );

        eligibleDisound = total / 5;
        return disounds;
      }

      disounds = <p>Get 10%</p>;

      disounds = (
        // disound 2
        <p>
          Get <strong>{"10%"}</strong> offer of <strong>{total / 10}</strong>$
          on top of your <strong>{total}$</strong>
        </p>
      );

      eligibleDisound = total / 10;
      return disounds;
    }
    // no discound add more products to cart
    disounds = <p>Shop more for {1000 - total}$ to get 10% discound </p>;
    return disounds;
  }

  return (
    <>
      <Navbar />

      <div className="cartContainerWrapper">
          {/* redners the list */}
        <div className="cartCardList">{renderCartItems(cartItems)}</div>

        <div className="cartTotalContainer">

          <div className="offersContainer">
            <h3>Offers and Cashback</h3>

            <p>on purchase above 2000 get 20% Cashback</p>
            <p>on purchase above 1000 get 10% Cashback</p>
            <p>
              * on purchasing with XXX debit or credit card get flat 10%
              additional discound valid till December 1 2022
            </p>
          </div>
          <div className="deliveryContiaer">
            <span>
              <h3>Shiping address:</h3>
              <p> N number , x street , y city,zzzz </p>
            </span>
          </div>

          <div className="applyDiscounds">
            <div className="eligibleDiscounds">
              <h3>Eligible discounds</h3>
              {/* fetches the eligible discound based on the total */}
              <p>{eligibleDidcounds()}</p>

              {total > 1000 ? (
                <button
                  onClick={() => {
                    setUseDiscound(!useDiscound);
                  }}
                  className={useDiscound ? "removeDiscound" : "addDiscound"}
                >
                  {useDiscound ? " Discound Applied" : " Get Disound"}
                </button>
              ) : null}
            </div>
          </div>
          <div className="productDetailsContainer">
            <h3>Order details:</h3>
            <p>Cart items: {cartItems && cartItems.length}</p>

            <p> Dicsound: {useDiscound ? eligibleDisound : 0}$</p>
            <p> Total: {total}$</p>
            {useDiscound ? (
              <h3>Buy now at {total - eligibleDisound}$</h3>
            ) : (
              <h3>Buy now at {total}$</h3>
            )}
          </div>
          <div className="princeContainer"></div>
          <div className="placeOrderContainer">
            <button>Place order</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
