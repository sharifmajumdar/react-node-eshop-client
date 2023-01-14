import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { ShopContext } from '../../App';

const Home = () => {
    const [showProducts] = useContext(ShopContext);
    const [select, setSelect] = useState([]);
    //const [isCart, setIsCart] = useState(false);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productIds = Object.keys(savedCart);

        const cartProducts = productIds.map(pdId => {
            const product = showProducts.find(pd => pd._id === pdId);
            return product;
        });
        setSelect(cartProducts);
    }, [showProducts]);

    //Handling product orders and sending localstorage using keys
    const addProductHandler = (showProduct) => {
        const newSelect = [...select, showProduct];
        setSelect(newSelect);
        const sameProduct = newSelect.filter(pd => pd._id === showProduct._id);
        const count = sameProduct.length;
        addToDatabaseCart(showProduct._id, count);
        //setIsCart(true);
    }
    return (
        <div className='container'>
            <div className='row mt-5 d-flex justify-content-evenly'>
                <div className="form-group col-md-4 col-md-offset-5 align-center ">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search item" aria-label="Search" />
                        <button className="btn btn-outline-info" type="submit">Search</button>
                    </form>
                </div>
                {
                    select.length > 0 && 
                        <div className='col-lg-4 col-xs-12'>
                            <div>
                                <Cart cart={select}>
                                    <Link to="/order">
                                        <button className='btn btn-info'>
                                            Review Order
                                        </button>
                                    </Link>
                                </Cart>
                            </div>
                        </div>
                }
            </div>
            <div className="row mt-5">
                {
                    showProducts && showProducts.map(showProduct =>
                        <div className="col-lg-3 col-md-4 col-xs-12" key={showProduct._id}>
                            <div className="card border-info bg-light mb-4">
                                <div className="card-body">
                                    <img src={showProduct.image} alt={showProduct.name} width="265px" height="210px" />
                                    <div className='d-flex justify-content-center mt-2'>
                                        <div><h5 className="card-title"><span>{showProduct.name + ` - `}</span></h5></div>
                                        <div>{<p className="card-text" style={{ textAlign: "justify" }}><span>{showProduct.weight}</span></p>}</div>
                                    </div>                           
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <div>
                                        <h5>€<span>{showProduct.price}</span></h5>
                                    </div>
                                    <div>
                                        <button className='btn btn-info' onClick={() => addProductHandler(showProduct)}>
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;