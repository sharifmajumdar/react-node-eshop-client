import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import './Admin.css';
import axios from 'axios';

const Admin = () => {
    const [addProduct, setAddProduct] = useState(false);
    const [manageProduct, setManageProduct] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [product, setProduct] = useState({});
    const [showProducts, setShowProducts] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    // useEffect is used to load from server side 
    useEffect(() => {
        fetch('http://localhost:5000/showProducts')
            .then((response) => response.json())
            .then((data) => {
                setShowProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Here, react useForm is used to saved data into database
    const onSubmit = () => {
        fetch('http://localhost:5000/addProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Data added successfully');
                    reset();
                }
            });
    }

    const handleOnBlur = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        const newProduct = { ...product };
        newProduct[field] = value;
        setProduct(newProduct);
    }

    const handleManageProduct = () => {
        setManageProduct(true);
        setAddProduct(false);
        //setIsEditProduct(false);
    }

    const handleAddProduct = () => {
        setAddProduct(true);
        setManageProduct(false);
        //setIsEditProduct(false);
    }

    //Imagebb used to host image data and get the link
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '2473d8a7f5f5ba28cf6657d5d572953f');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
        const field = event.target.name;
        const newProduct = { ...product };
        newProduct[field] = imageURL;
        setProduct(newProduct);
    }

    // Deleting data by authorized user 
    const handleDelete = (showProduct) => {
        const agree = window.confirm(`Are you sure to delete: ${showProduct.name}`);
        if (agree) {
            fetch(`http://localhost:5000/showProducts/${showProduct._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Data deleted');
                        const remainingProducts = showProducts.filter(pd => pd._id !== showProduct._id);
                        setShowProducts(remainingProducts);
                    }
                });
        }
    }

/*     const handleUpdate = (showProduct) => {
        setIsEditProduct(true);
        setAddProduct(false);
        setManageProduct(false);
        const findProduct = showProducts.find(sd => sd._id === showProduct._id);
        setEditProduct(findProduct);
    } */
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-2 bg-secondary justify-content-center align-items-center'>
                    <div><h1 className='text-white'>eShop</h1></div><hr />
                    <div><Link onClick={() => handleManageProduct()} className='nav-link text-light'><DashboardIcon />Manage Product</Link></div><br />
                    <div><Link onClick={() => handleAddProduct()} className='nav-link text-light'><AddIcon />Add Product</Link></div><br />
                </div>
                <div className='col-md-10 bg-light'>
                    <h1>Dashboard for product management</h1><hr />
                    {
                        addProduct &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row d-flex justify-content-around">
                                <div className="form-group col-md-5">
                                    <label>Product Name</label>
                                    <input {...register("name", { required: true })} onBlur={handleOnBlur} name='name' type="text" className="form-control" placeholder="Enter name" />
                                    {errors.name && <span className='error'>Name is required</span>}
                                </div>
                                <div className="form-group col-md-5">
                                    <label>Weight</label>
                                    <input {...register("weight", { required: true })} onBlur={handleOnBlur} name='weight' type="text" className="form-control" placeholder="Enter weight" />
                                    {errors.weight && <span className='error'>Weight is required</span>}
                                </div>
                            </div> <br />
                            <div className="form-row d-flex justify-content-around">
                                <div className="form-group col-md-5">
                                    <label>Price</label>
                                    <input {...register("price", { required: true })} onBlur={handleOnBlur} name='price' type="text" className="form-control" placeholder="Enter price" />
                                    {errors.price && <span className='error'>Price is required</span>}
                                </div>
                                <div className="form-group col-md-5">
                                    <label>Add Image</label>
                                    <input name='image' type="file" className="form-control" onChange={handleImageUpload} placeholder="Upload image" />
                                </div>
                            </div>
                            <br />
                            <div className="form-row d-flex justify-content-center">
                                <button className="btn btn-outline-info" type="submit">Save Item</button>
                            </div>
                        </form>
                    }
                    {
                        manageProduct &&
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col"> Weight</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showProducts && showProducts.map(showProduct =>
                                        <tr key={showProduct._id}>
                                            <th scope="row">{showProduct._id}</th>
                                            <td>{showProduct.name}</td>
                                            <td>{showProduct.weight}</td>
                                            <td>{showProduct.price}</td>
                                            <td><DeleteIcon onClick={() => handleDelete(showProduct)} /></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    );
};

export default Admin;