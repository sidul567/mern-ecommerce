import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars';

function ProductCard({product}) {
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars 
                edit = {false}
                color1='rgba(20,20,20,0.1)'
                color2 = "tomato"
                value={product.ratings}
                size={window.innerWidth < 600 ? 20 : 25} 
            />
            <span>({product.numberOfReviews} reviews)</span>
        </div>
        <span>${product.price}</span>
    </Link>
  )
}

export default ProductCard