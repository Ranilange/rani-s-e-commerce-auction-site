import React, { useEffect, useState } from 'react'
import './ProductList.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'


export default function ProductList({ userName }) {


    const [products, setProducts] = useState([])


    const [validBid, setValidBid] = useState(new Array(products.length))

    const [bids, setBids] = useState(new Array(products.length))


    const getProductsFromBE = async () => {
        axios.get("http://localhost:3000/product/").then((res, err) => {
            setProducts(res.data.data)
        })
    }

    useEffect(() => {
        getProductsFromBE()

        validBid.map((bid) => false)
        setValidBid([...validBid])
    }, [])

    const updatePrice = async (bid, productID) => {
        console.log(bid);
        await axios.put(`http://localhost:3000/product/${productID}`, { bid: bid }).then(getProductsFromBE())

        // getProductsFromBE()
    }

    const deleteProduct = async (productID) => {
        await axios.delete(`http://localhost:3000/product/${productID}`).then(getProductsFromBE())
    }

    const checkIfBidOk = (bid, price) => {

        return !(bid >= price + 100)
    }

    console.log(userName);
    return (
        <div className='page-container'>
            < div className='productlist-title' >
                <h1>welcome to my site </h1>
                <br />
                <h3>LIST OF PRODUCTS</h3>

                {userName ? <h4>add your bid, min 100$</h4> : <h4>to add a bid you must connect</h4>}
            </div >
            <br /> <br /> <br /><br />
            <div className="container">
                {products.map((product, index) => {
                    return (<div key={index} className="card">
                        <img className='product-image' src={product.image} alt="Avatar" style={{ width: "100%" }} />
                        <div className="details">
                            <h4><b>{product.title}</b></h4>
                            <p>{product.description}</p>
                            <p>start date:<strong>{product.createdAt && product.createdAt.split("T")[0]}</strong></p>
                            <p>price:<strong>{product.price}</strong></p>

                            <TextField


                                type="number"
                                defaultValue={product.price + 100}
                                helperText="add your bid"
                                onChange={(event) => {
                                    bids[index] = parseInt(event.target.value)
                                    setBids([...bids])

                                    validBid[index] = checkIfBidOk(bids[index], product.price)
                                    setValidBid([...validBid])


                                }} />
                        </div>
                        <div className='product-button-container'>
                            {userName ?
                                <Button className="product-button" variant="contained" disabled={validBid[index]} onClick={() => { updatePrice(bids[index], product._id) }}>update bid</Button> :
                                <Button className="product-button" variant="contained" disabled>update bid</Button>
                            } <br />
                            <Button className="product-button" variant="contained" onClick={() => deleteProduct(product._id)}>Delete product</Button>
                        </div>
                    </div>)
                })}
            </div>
        </div>


    )
}
