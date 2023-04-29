import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import { toast } from 'react-toastify'

function Home() {
  const { products, isLoading, error, productCount } = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      toast.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="MERN-ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Mern-Eccomerece</p>
            <h1>Find product here below.</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <div className="homeHeading" id='container'>Feature Products</div>

          <div className="container">
            {products && products.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home