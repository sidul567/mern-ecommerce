import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Delete, Edit, Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './ProductList.css';
import { toast } from 'react-toastify';
import { allReviewAction, deleteProductAction, deleteReviewAction, getAdminProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { ALL_REVIEW_RESET, DELETE_PRODUCT_RESET, DELETE_REVIEW_RESET } from '../../constants/productConstant';
import './ReviewList.css';

function ReviewList() {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.userDetails);
  const {reviews, error, isLoading: reviewLoading} = useSelector(state=>state.productReviews);
  const {error: deleteError, success, isLoading} = useSelector(state=>state.review);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type: ALL_REVIEW_RESET});
    }
    if(deleteError){
      toast.error(deleteError);
    }
    if(success){
      toast.success("Review deleted successfully!");
      navigate("/admin/reviews");
      dispatch({type: DELETE_REVIEW_RESET});
      dispatch(allReviewAction(productId));
    }
  }, [dispatch, error, deleteError, navigate, success, productId])

  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  const deleteProductReview = (id)=>{
    dispatch(deleteReviewAction(productId, id));
  }

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 100, flex: 1 },
    {
      field: "name", headerName: "User Name", minWidth: 150, flex: 0.5, 
    },
    { field: "comment", headerName: "Comment",minWidth: 200, flex: 0.3 },
    { field: "rating", headerName: "Rating", type: "number", flex: 0.5, cellClassName: (params)=>{
        return params.row.rating < 3 ? "redColor" : "greenColor";
    } },
    {
      field: "actions", headerName: "Actions", type: "number", sortable: false, minWidth: 150, flex: 0.3, renderCell: (params) => {
        return (
          <>
            <Button onClick={()=>deleteProductReview(params.row.id)} disabled={isLoading}>
              <Delete />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  reviews && reviews.forEach((review)=>{
    rows.push({
      id: review._id,
      name: review.name,
      comment: review.comment,
      rating: review.rating,
    })
  })

  const searchProductReview = (e) => {
    e.preventDefault();

    dispatch(allReviewAction(productId));
}

  return (
    <div className='dashboard'>
      {isLoading && <Loader />}
      {reviewLoading && <Loader />}
      <Sidebar open={false} />
      <div className="productsListContainer reviewListContainer">
       <form className="newProductForm" onSubmit={searchProductReview}>
                <h1>All Reviews</h1>
                <div>
                    <Star />
                    <input
                        type="text"
                        placeholder='Product Name'
                        value={productId}
                        onChange={(e)=>setProductId(e.target.value)}
                        required
                        name='Name'
                    />
                </div>
                <input
                    type="submit"
                    value="Search"
                    className='newProductSubmit'
                />
            </form>
        <DataGrid 
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                }
              }
            }}
            disableRowSelectionOnClick
            className='productListTable'
            autoHeight
            pageSizeOptions={[10]}
          />
      </div>
    </div>
  )
}

export default ReviewList