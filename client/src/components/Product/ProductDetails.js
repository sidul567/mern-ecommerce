import React, { useEffect, useState } from 'react'
import Carousel, { } from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReviewAction } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import ReactStars from 'react-stars';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify'
import { addToCartAction } from '../../actions/cartAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstant';

function ProductDetails() {
    const { product, isLoading, error } = useSelector(state => state.productDetails);
    const {reviewError, success} = useSelector(state=>state.newReview)
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if(error){
            toast.error(error);
        }
        if(reviewError){
            toast.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Review submitted successfully.");
            dispatch({type: NEW_REVIEW_RESET});
        }
        window.scrollTo(0, 0);
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, reviewError, success]);

    const increaseQuantity = ()=>{
        if(quantity+1 > product.stock) return;
        setQuantity(quantity+1);
    }

    const decreaseQuantity = ()=>{
        if(quantity-1 < 1) return;
        setQuantity(quantity-1);
    }

    const addToCart = ()=>{
        dispatch(addToCartAction(id, quantity));
        toast.success("Item added to cart!");
    }

    const submitReviewToggle = ()=>{
        setOpen(!open);
    }

    const reviewSubmit = ()=>{
        const formData = new FormData();

        formData.append("rating", rating);
        formData.append("comment", comment);
        formData.append("productId", id);

        dispatch(newReviewAction(formData));
        setOpen(false);
    }

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
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCart} disabled={product.stock < 1}>Add to Cart</button>
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
                            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                        </div>
                    </div>
                    <div className="reviewHeading">Reviews</div>
                    <Dialog
                        aria-labelledby='Dialog'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating 
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
                                size='large'
                                className='ratingStar'
                            />
                            <textarea id="" cols="30" rows="5" className='submitReviewTextarea' value={comment} onChange={(e)=>setComment(e.target.value)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                            <Button color='primary' onClick={reviewSubmit}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                    <div className="reviews">
                        {
                            product.reviews && product.reviews[0] && product.reviews.map((review) => (
                                <ReviewCard review={review} key={review._id} />
                            ))
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails