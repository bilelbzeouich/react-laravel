import React, { useEffect, useState } from 'react';
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { HdrPlusRounded, ListAltOutlined, PlusOneSharp } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { Plus } from '@rsuite/icons';
import Swal from 'sweetalert2';

const EditExpedition = () => {
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const [selectedclient, setSelectedclient] = useState([]);
    const [date, setDate] = useState([]);
    const [client, setClient] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedproduct, setSelectedproduct] = useState('');
    const [product, setProduct] = useState([]);


    useEffect(() => {
        axios
            .get(Constants.BASE_URL + '/client')
            .then((response) => {
                console.log(response.data);
                setClient(response.data);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        axios
            .get(Constants.BASE_URL + '/produit')
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);







    return (
        <>

            <BreadCumb title="Ajouter Fornisseur" />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Ajouter bon livraison</h4>
                                <Link to="/expedition/liste">
                                    <Button type="primary" className="right_button" variant="outline-success">
                                        <ListAltOutlined />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div
                            className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="w-300">
                                        <p>Client</p>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={selectedclient}
                                            onChange={(e) => setSelectedclient(e.target.value)}
                                        >
                                            <option value="">Select Client</option>
                                            {client.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.prenom}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <Link to="/Clients/add">
                                        <button className="btn btn-outline-success">Ajouter Client</button>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-300">
                                        <p>Date</p>
                                        <section className="container">
                                            <form className="row">
                                                <div className="input-group date" id="datepicker">
                                                    <input type="date"
                                                        className="form-control"
                                                        id="date"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                    <span className="input-group-append"></span>
                                                </div>
                                            </form>
                                        </section>
                                    </label>
                                </div>
                                <table className="table">
                                    <thead className="">
                                        <tr>
                                            <th scope="col">Produit</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Emplacement</th>
                                            <th scope="col">Qte</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <td>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={selectedproduct}

                                                name="selectedproduct"
                                            >
                                                <option value="">Select Product</option>
                                                {product.map((product) => (
                                                    <option key={product.id} value={product.id}>{product.nom}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"

                                                readOnly
                                                placeholder="Category Name"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"

                                                readOnly
                                                placeholder="Emplacement Name"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="Qte"


                                                placeholder="Qte"
                                            />
                                        </td>

                                    </tbody>

                                </table>




                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="" className="btn btn-outline-success ">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditExpedition;