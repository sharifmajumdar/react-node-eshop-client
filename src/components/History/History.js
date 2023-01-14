import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../App';
import { Link } from 'react-router-dom';

const History = () => {
    const [history, setHistory] = useState(null);
    const [,,loggedInUser] = useContext(ShopContext);

    useEffect(() => {
        fetch('http://localhost:5000/showHistory?email=' + loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setHistory(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [loggedInUser.email]);
    return (
        <div className='container'>
            <h1>Order History</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Cutomer Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>                        
                        <th scope="col">Payment</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history && history.map(hs =>
                            <tr key={hs._id}>
                                <th scope="row">{hs._id}</th>
                                <td>{hs.shipment.email}</td>
                                <td>{hs.shipment.address}</td>
                                <td>{hs.shipment.phone}</td>
                                <td>{hs.orderTime}</td>
                                <td>{hs.payment}</td>
                                <td style={{color: 'green'}}>{hs.status}</td>
                                <td><Link>Details</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default History;