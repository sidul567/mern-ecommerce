import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, updateProductAction } from '../../actions/productAction';
import { toast } from 'react-toastify';
import './NewProduct.css';
import { PRODUCT_DETAILS_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstant';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.userDetails);
    const {id} = useParams();
    const {isLoading, error, success} = useSelector(state=>state.product);
    const {error: productError, product} = useSelector(state=>state.productDetails);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(()=>{
        if(product && product._id !== id){
            dispatch(getProductDetails(id));
        }else{
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setCategory(product.category);
            setDescription(product.description);
            setOldImages(product.images);
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors);
        }
        if(productError){
            toast.error(productError);
            dispatch(clearErrors);
        }
        if(success){
            toast.success("Product Updated successfully!");
            navigate("/admin/dashboard");
            dispatch({type: UPDATE_PRODUCT_RESET});
            dispatch({type: PRODUCT_DETAILS_RESET});
        }
    }, [dispatch, error, success, navigate, id, product, productError])

    if(user.role !== "admin"){
        return <Navigate to="/login" />
      }

    const createProdutImagesChange = (e)=>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        
        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImagesPreview((prevImages)=>[...prevImages, reader.result]);
                    setImages((prevImages)=>[...prevImages, file]);
                }
            }

            reader.readAsDataURL(file);
        })
    }

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    const updateProudct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("stock", stock);
        
        oldImages && oldImages.forEach((image)=>{
            console.log(JSON.stringify(image));
            formData.append("images", JSON.stringify(image));
        })

        images && images.forEach((image)=>{
            formData.append("images", image);
        })

        dispatch(updateProductAction(id, formData));
    }  
  return (
    <>
    {
        isLoading && <Loader />
    }
    <div className='dashboard'>
        <Sidebar open={true} />
        <div className="newProductContainer">
            <form className="newProductForm" onSubmit={updateProudct} encType='multipart/form-data'>
                <h1>Update Product</h1>
                <div>
                    <Spellcheck />
                    <input
                        type="text"
                        placeholder='Product Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                        name='Name'
                    />
                </div>
                <div>
                    <AttachMoney />
                    <input
                        type="number"
                        required
                        placeholder='Price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        name='Price'
                    />
                </div>
                <div>
                    <Description />
                    <textarea 
                        placeholder='Product Description'
                        cols="30" 
                        rows="1" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                        name='Description'
                    />
                </div>
                <div>
                    <AccountTree />
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
                        <option value="" disabled>Choose Category</option>
                        {
                            categories.map((category)=>(
                                <option value={category} key={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <Storage />
                    <input
                        type="number"
                        required
                        placeholder='Stock'
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                        name='Stock'
                    />
                </div>
                <div className="createProductFile">
                    <input
                        type="file"
                        name='avatar'
                        accept='image/*'
                        onChange={createProdutImagesChange}
                        multiple
                    />
                </div>
                <div className="createProductImages">
                    {
                        oldImages.map((image, index)=>(
                            <img src={image.url} key={index} alt="Product Review" />
                        ))
                    }
                </div>
                <div className="createProductImages">
                    {
                        imagesPreview.map((image, index)=>(
                            <img src={image} alt="Product Review" />
                        ))
                    }
                </div>
                <input
                    type="submit"
                    value="Update"
                    className='newProductSubmit'
                    disabled={isLoading}
                />
            </form>
        </div>
    </div>
    </>
  )
}

export default UpdateProduct