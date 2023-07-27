import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './ProductList.css';
import { toast } from 'react-toastify';
import { deleteProductAction, getAdminProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';

function ProductList() {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.userDetails);
  const {products, error} = useSelector(state=>state.products);
  const {error: deleteError, success, isLoading} = useSelector(state=>state.product);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      toast.error(error);
    }
    if(deleteError){
      toast.error(deleteError);
    }
    if(success){
      toast.success("Product deleted successfully!");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, navigate, success])

  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  const deleteProduct = (id)=>{
    dispatch(deleteProductAction(id));
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 1 },
    {
      field: "name", headerName: "Name", minWidth: 200, flex: 0.5, 
    },
    { field: "stock", headerName: "Stock", type: "number", flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 200, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: "number", sortable: false, minWidth: 150, flex: 0.3, renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={()=>deleteProduct(params.row.id)} disabled={isLoading}>
              <Delete />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  products && products.forEach((product)=>{
    rows.push({
      id: product._id,
      name: product.name,
      stock: product.stock,
      price: product.price,
    })
  })

  return (
    <div className='dashboard'>
      {isLoading && <Loader />}
      <Sidebar open={true} active="all"/>
      <div className="productsListContainer">
       <h1>All Products</h1>
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

export default ProductList