import React from 'react'
import ProductList from './ProductList'

function Home({ userName }) {
    return (
        <div>


            <ProductList userName={userName}></ProductList>
        </div>
    )
}

export default Home