import React, { useEffect, useState } from 'react'
import Carousel, { } from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ReactStars from 'react-stars';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify'

function ProductDetails() {
    const { product, isLoading, error } = useSelector(state => state.productDetails);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if(error){
            toast.error(error);
        }
        window.scrollTo(0, 0);
        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='productDetails'>
                        <div className='carouselSlider'>
                            <Carousel>
                                {
                                    product.images && product.images.map((item, i) => (
                                        <img src={item.url} alt={`SLIDE-${i}`} className='productImage' key={i} />
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="detailsBlock2">
                                <ReactStars
                                    edit={false}
                                    color1='rgba(20,20,20,0.1)'
                                    color2="tomato"
                                    value={product.ratings}
                                    size={window.innerWidth < 600 ? 20 : 25}
                                />
                                <span>({product.numberOfReviews})</span>
                            </div>
                            <div className="detailsBlock3">
                                <h1>${product.price}</h1>
                                <div className="detailsBlock3-1">
                                    <div className="detailsBlock3-1-1">
                                        <button>-</button>
                                        <input type="number" />
                                        <button>+</button>
                                    </div>
                                    <button>Add to Cart</button>
                                </div>
                                <p>
                                    Status: <strong className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </strong>
                                </p>
                            </div>
                            <div className="detailsBlock4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>
                    <div className="reviewHeading">Reviews</div>
                    <div className="reviews">
                        {
                            product.reviews && product.reviews[0] && product.reviews.map((review) => (
                                <ReviewCard review={review} />
                            ))
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails