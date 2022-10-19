import React, { useState } from "react";
import axios from "axios";

function Add() {
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const saveProduct = async (e) => {
        e.preventDefault();
        const product = {
            title: productTitle,
            description: productDescription,
            image: productImage,
            price: productPrice
        }
        const newProduct = await axios.post("http://localhost:3000/product/", product)

        console.log(newProduct)
    }

    return (
        <div>
            <div>Add product</div>
            <form>
                <div>
                    <label>product Name</label>
                    <input
                        type="text"
                        onChange={(e) => setProductTitle(e.target.value)}
                        value={productTitle}
                    />
                </div>
                <div>
                    <label>product description</label>
                    <input
                        type="text"
                        onChange={(e) => setProductDescription(e.target.value)}
                        value={productDescription}
                    />
                </div>
                <div>
                    <label>product Image</label>
                    <input
                        type="text"
                        onChange={(e) => setProductImage(e.target.value)}
                        value={productImage}
                    />
                </div>
                <div>
                    <label>product Price</label>
                    <input
                        type="text"
                        onChange={(e) => setProductPrice(e.target.value)}
                        value={productPrice}
                    />
                </div>
                <button onClick={(e) => saveProduct(e)}>Save product</button>
            </form>
        </div>
    );
}

export default Add;
