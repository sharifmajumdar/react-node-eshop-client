import './Services.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import { useState, useEffect } from 'react';
import Data from '../../data/Data.json';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Services = (props) => {
        const [passes, setPasses] = useState([]);
        const [select, setSelect] = useState([]);

        //fetching local storage data before calling fake dataset
        useEffect(() => {
            const savedPass = getDatabaseCart();
            const passKeys = Object.keys(savedPass);

            const previousPass = passKeys.map(pskey => {
                const pass = Data.find(pss => pss.key === Number(pskey));
                return pass;
            });
            setSelect(previousPass);
        }, []);

        useEffect(() => {
            setPasses(Data);
        }, [passes]);

        //Handling pass orders and sending localstorage using keys
        const addPassHandler = (pass) => {
            const newSelect = [...select, pass];
            setSelect(newSelect);
            const samePass = newSelect.filter(ps => ps.key === pass.key);
            const count = samePass.length;
            addToDatabaseCart(pass.key, count);
        }
    return (
        <div className='row'>
            <div className="col-lg-8 col-xs-12">
                <h1 className='pass-item'>Available passes are:</h1><br />
                {
                    passes && passes.map(pass => 
                    <div className='pass-item' key = {pass.key}>
                        <h5>{pass.title}</h5>
                        <small><b>Description: </b><span style={{textAlign: "justify"}}> {pass.description}</span></small><br />
                        <small><b>Area:</b> {pass.area}</small><br />
                        <small><b>Duration:</b> {pass.duration}</small><br />         
                        <small><b>Price:</b> EUR{pass.price}</small><br />
                        <button className='btn btn-info'
                            onClick={() => addPassHandler(pass) }>
                                Choose Pass</button>
                    </div>)
                }
            </div>
            <div className='col-lg-4 col-xs-12'>
                <div>
                    <Cart cart = {select}>
                        <Link to="/order">
                            <button className='btn btn-info'>
                                Review Order
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Services;