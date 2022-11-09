import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const initialState = {
  products: [],
  cart: [],
};

// to get all products on page load
export const fetchAsyncThunk = createAsyncThunk(
  "products/fetchAsyncThunk",
  async () => {
    const response = await fetch("/products");
    const data = await response.json();
    console.log(data);
    return data;
  }
);

// to add a new products to db
export const addAsyncThunk = createAsyncThunk(

  "products/addAsyncThunk",
  async (productdata) => {
    const requestOptions={
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( productdata),
    }

    const response = await fetch(
      "/products",
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

// get cart list from db
export const cartAsyncThunk = createAsyncThunk(
  "products/checkAsyncThunk",
  async () => {
    const response = await fetch("/cart");
    const data = await response.json();
    console.log(data);
    return data;
  }
);

// adding to fav
export const addToFavAsyncThunk = createAsyncThunk(
  "products/addToFavAsyncThunk",
  async (product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    const response = await fetch("/cart", requestOptions);
    const data = await response.json();
    return data;
  }
);
// del from fav
export const deleteFromFavAsyncThunk = createAsyncThunk(
  "products/deleteFromFavAsyncThunk",
  async (product) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    let id = product.id;
    const response = await fetch(
      `/cart/${id}`,
      requestOptions
    );
    const data = await response.json();
    return id;
  }
);
// get detail of the movie
export const getMovieAsyncThunk = createAsyncThunk(
  "products/getMovieAsyncThunk",
  async (id) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `/products/${id}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);
// delete a product
export const deleteProductAsyncThunk = createAsyncThunk(
  "products/deleteProductAsyncThunk",
  async (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(
      `/products/${id}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: {
    [deleteProductAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("Deleted", { theme: "dark", autoClose: 600 });
      return state;
    },

    [fetchAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("got all products", { theme: "dark", autoClose: 600 });
      return { ...state, products: payload };
    },

    [addAsyncThunk.fulfilled]: (state, { payload }) => {
      state.products.push(payload);
      toast.success("Creared a product", { theme: "dark", autoClose: 600 });
      return state;
    },

    [addAsyncThunk.rejected]: (state, { payload }) => {
      return state;
    },

    [cartAsyncThunk.fulfilled]: (state, { payload }) => {
      return { ...state, cart: payload };
    },

    [addToFavAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("Added to cart", { theme: "dark", autoClose: 600 });
      state.cart.push(payload);
      return state;
    },

    [deleteFromFavAsyncThunk.fulfilled]: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
      toast.success("Deleted from cart", { theme: "dark", autoClose: 600 });
      return state;
    },

    [getMovieAsyncThunk.fulfilled]: (state, { payload }) => {
      toast.success("Fetched details ", { theme: "dark", autoClose: 600 });
      return state;
    },
  },
});

export const getAllProducts = (state) => {
  const products = {
    men: [],
    women: [],
  };

  const allproducts = state.products.products;
  
  // to send all products from state;
  if (allproducts != undefined) {
    allproducts.map((product) => {
      if (product.men === "true") {
        products.men.push(product);
      } else {
        products.women.push(product);
      }
    });
  }

  return products;
};

// function to send the cartlist
export const getItemsFromcart = (state) => {
  const cartItems = state.products.cart;
  return cartItems;
};

export default productSlice.reducer;
