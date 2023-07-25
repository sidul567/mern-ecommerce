import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createNewProduct } from '../../actions/productAction';
import { toast } from 'react-toastify';
import './NewProduct.css';
import { NEW_PRODUCT_RESET } from '../../constants/productConstant';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

function NewProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, error, success} = useSelector(state=>state.newProduct);

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors);
        }
        if(success){
            toast.success("Product created successfully!");
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET});
        }
    }, [dispatch, error, success, navigate])

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const createProdutImagesChange = (e)=>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        
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

    const createNewProudct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("stock", stock);
        
        images.forEach((image)=>{
            formData.append("images", image);
        })

        dispatch(createNewProduct(formData));
    }  
  return (
    <>
    {
        isLoading && <Loader />
    }
    <div className='dashboard'>
        <Sidebar open={true} />
        <div className="newProductContainer">
            <form className="newProductForm" onSubmit={createNewProudct} encType='multipart/form-data'>
                <h1>Create Product</h1>
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
                    <select defaultValue={""} onChange={(e)=>setCategory(e.target.value)} required>
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
                        required
                    />
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
                    value="Create"
                    className='newProductSubmit'
                    disabled={isLoading}
                />
            </form>
        </div>
    </div>
    </>
  )
}

export default NewProduct