import React, { useState } from "react";

// components

import { Navbar } from "../components/index";

//reactforms
import { useForm } from "react-hook-form";

//uuid for unique id
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

//create new product
import { addAsyncThunk } from "../features/products/productSlice";

//react router dom
import { useNavigate } from "react-router-dom";

//tostify
import { toast, ToastContainer } from "react-toastify";

import styles from "../styles/Create.module.css";

//to reset to default value and show this a  the inital value through react forms
const defaultValues = {
  description: "",
  veg: "",
  name: "",
  price: "",
  twokg: "",
  fivekg: "",
  tenkg: "true",
  url: "",
};

function Create() {
  const dispatch = useDispatch();

  //destructruing objects from useForms

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  //function to disptch async action and rest the data of form and navigate to home page
  const createAproduct = async (data) => {
    const uniqueid = uuidv4;

    const newProeuct = {
      id: uniqueid,
      ...data,
    };

    const response = await dispatch(addAsyncThunk(newProeuct));

    reset({
      description: "",
      veg: "",
      name: "",
      price: "",
      twokg: "",
      fivekg: "",
      tenkg: "true",
      url: "",
    });
    //if fulfilled navigat to home
    if (response.type === "products/addAsyncThunk/fulfilled") {
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.detailsWrapper}>
        <div className={styles.detailForms}>
          <h1>Create product</h1>
          <form
            onSubmit={handleSubmit((product) => {
              //create a new product in db after vallidation
              createAproduct(product);
            })}
          >
            <fieldset>
              {/* name */}
              <div className={styles.inputGroup}>
                <label for="pname">Product name:</label>
                <input
                  id="pname"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  {...register("name", { required: true, maxLength: 200 })}
                />
              </div>
              {/* price */}
              <div className={styles.inputGroup}>
                <label for="pprice">Product Price:</label>
                <input
                  id="pprice"
                  placeholder="Product Price"
                  type="number"
                  name="price"
                  {...register("price", { required: true, maxLength: 10000 })}
                />
              </div>
              {/* size */}

              <div className={styles.inputGroup}>
                <label for="s">Product quantity:</label>

                <input
                  type="checkbox"
                  id="s"
                  name="tenkg"
                  value={true}
                  {...register("tenkg")}
                />
                <label for="s">S</label>
                <input
                  type="checkbox"
                  id="m"
                  name="fivekg"
                  value={true}
                  {...register("fivekg")}
                />
                <label for="m">M</label>
                <input
                  type="checkbox"
                  id="l"
                  name="twokg"
                  value={true}
                  {...register("twokg")}
                />
                <label for="l">L</label>
              </div>
              {/* Description */}
              <div className={styles.inputGroup}>
                <label for="pcolor">Product Description:</label>
                <input
                  id="pcolor"
                  name="description"
                  placeholder="Product Description"
                  {...register("description", { required: true })}
                />
              </div>
              {/* product */}
              <div className={styles.inputGroup}>
                <label for="veg">Type:</label>
                <input
                  id="veg"
                  type="radio"
                  name="vegOrFruit"
                  value="true"
                  {...register("veg", { required: true })}
                />
                <label for="veg">VEGETABLES</label>
                <input
                  id="fruit"
                  type="radio"
                  name="vegOrFruit"
                  value="false"
                  {...register("veg", { required: true })}
                />
                <label for="fruit">FRUITS</label>
              </div>
                {/* image */}
              <div className={styles.inputGroup}>
                <label for="pUrl">Product image url:</label>
                <input
                  id="pUrl"
                  placeholder="Product image url"
                  name="url"
                  {...register("url", { required: true })}
                />
              </div>

              <br />

              <button
                type="submit"

                // handles submit aciton 


                onClick={() => {
                  //form validation
                  if (
                    errors.url ||
                    errors.description ||
                    errors.name ||
                    errors.veg ||
                    errors.price
                  ) {
                    //if not filled 
                    toast.warn("fill all feald", {
                      autoClose: 600,
                      theme: "colored",
                    });
                  }
                }}
              >
                submit
              </button>
            </fieldset>
          </form>
          
          {/* to send notification */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Create;
