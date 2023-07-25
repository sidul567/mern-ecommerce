import React, { useEffect, useRef, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { clearErrors, getProducts } from '../../actions/productAction';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import './Products.css'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typography from '@mui/material/Typography';
import { Slider } from '@mui/material';

function Products() {
    const { products, isLoading, error, productCount, resultPerPage, filterProductCount } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {keyword} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [categoryActiveIndex, setCategoryActiveIndex] = useState(null);
    const categories = ["Laptop", "Smartphone", "TV", "Shirt", "Pant", "Shoes"];
    const [ratings, setRatings] = useState(0);
    const liEl = useRef([]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, error, keyword, currentPage, price, category, ratings])

    const handleCurrentPage = (page)=>{
        setCurrentPage(page);
    }

    const priceHandler = (e, newPrice)=>{
        setPrice(newPrice);
    }

    const categoryHandler = (categoryName,i)=>{
        setCategory(categoryName);
        setCategoryActiveIndex(i);
    }
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="productsHeading">Products</div>

                    <div className="productsContainer">
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider 
                                size='small'
                                valueLabelDisplay='auto'
                                min={0}
                                max={25000}
                                aria-labelledby='ranger-slider'
                                value={price}
                                onChangeCommitted={priceHandler}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category, i)=>(
                                    <li key={category} className={`categoryItem ${categoryActiveIndex === i ? "active" : ""}`} onClick={()=>categoryHandler(category,i)} ref={el=>liEl.current[i]=el}>{category}</li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component='legend'>Rating Above</Typography>
                                <Slider 
                                    size='small'
                                    valueLabelDisplay='auto'
                                    min={0}
                                    max={5}
                                    aria-labelledby='ranger-slider'
                                    value={ratings}
                                    onChange={(e, newRatings)=>setRatings(newRatings)}
                                />
                            </fieldset>
                        </div>
                        <div className="allProducts">
                            {products && products.map(product => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    </div>


                    {resultPerPage < filterProductCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productCount}
                                onChange={handleCurrentPage}
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default Products