import React, { useEffect, useState } from 'react';
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { HdrPlusRounded, ListAltOutlined, PlusOneSharp } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { Plus } from '@rsuite/icons';
import Swal from 'sweetalert2';

const AddExp = () => {
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

    const [randomCode, setRandomCode] = useState('');
    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }

        return code;
    };

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


    const [rows, setRows] = useState([]);

    const handleAddRow = () => {
        const newRow = {
            client: selectedclient,
            date: date,
            selectedproduct: '',
            categoryName: '',
            emplacementName: '',
            Qte: '',
            categoryName_id: '',
            emplacementName_id: '',
            prix: '',
            ref: '', // Include the ref field with the generated random code
        };

        setRows((prevRows) => [...prevRows, newRow]);

    };

    const handleRowChange = (index, e) => {
        const { name, value } = e.target;
        setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index][name] = value;

            // Update the selected product for the row
            if (name === 'selectedproduct') {
                const selectedProduct = product.find((product) => product.id === value);
                if (selectedProduct) {
                    updatedRows[index].categoryName = selectedProduct.categoryName;
                    updatedRows[index].emplacementame = selectedProduct.emplacementName;
                    updatedRows[index].prix = selectedProduct.prix;


                } else {
                    updatedRows[index].categoryName = '';
                    updatedRows[index].emplacementame = '';
                    updatedRows[index].prix = '';
                }
                if (name === 'selectedclient') {
                    updatedRows[index].selectedClient = value;

                } else if (name === 'date') {
                    updatedRows[index].date = value;
                }

                updatedRows[index].ref = randomCode;
                // Fetch category name and emplacement name based on selected product
                const fetchCategoryName = async () => {
                    try {
                        const response = await axios.get(Constants.BASE_URL + `/product/${value}`);
                        updatedRows[index].categoryName = response.data.categoryName.name;
                        updatedRows[index].emplacementame = response.data.emplacementName.name;
                        updatedRows[index].categoryName_id = response.data.categoryName.id;
                        updatedRows[index].emplacementName_id = response.data.emplacementName.id;
                        updatedRows[index].prix = response.data.product.prix;
                        updatedRows[index].image = response.data.product.image;

                        setRows(updatedRows);
                    } catch (error) {
                        console.error('Error fetching category name:', error);
                    }
                };

                fetchCategoryName();
            }

            return updatedRows;
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post(Constants.BASE_URL + '/livraison', { rows });
            console.log(response.data);
            setRows((prevRows) =>
                prevRows.map((row) => ({
                    client: '',
                    date: '',
                    selectedproduct: '',
                    categoryName: '',
                    emplacementame: '',
                    Qte: '',
                    prix: '',

                })));
            // Check if the response contains an error message
            if (response.data.message === 'Insufficient capacity') {
                // Display Swal error message
                Swal.fire({
                    icon: 'error',
                    title: 'Insufficient quantiter',
                    text: 'The emplacement does not have enough quantiter.',
                });
            } else {
                // Product added successfully
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                Swal.fire({
                    title: 'Success',
                    text: 'client ajouté avec succès',
                    icon: 'success',
                    showConfirmButton: false
                });

            }
        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding product:', error);
            Swal.fire('Error', 'quantité insuffisante', 'error');
        }
    }
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        rows.forEach((row) => {
            const price = parseFloat(row.prix);
            const quantity = parseFloat(row.Qte);
            if (!isNaN(price) && !isNaN(quantity)) {
                totalPrice += price * quantity;
            }
        });
        return totalPrice.toFixed(2);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <BreadCumb title="Ajouter bon livraison" />
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
                                            <button className="btn btn-outline-success" style={{ margin: '10px' }}>
                                                Ajouter Client
                                            </button>
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
                                                <th scope="col">Image</th>
                                                <th scope="col">Produit</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Emplacement</th>
                                                <th scope="col">Prix</th>
                                                <th scope="col">Qte</th>
                                                <th scope="col">Prix*Qte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img
                                                            src={row.image ? "/" + row.image : null}
                                                            alt={row.name}

                                                            style={{
                                                                width: row.image ? '20%' : 0, // Set width to 20% if there is an image, otherwise 0
                                                                borderRadius: '5px',
                                                                padding: 0,
                                                                marginRight: row.image ? '5px' : 0, // Add margin on the right only if there is an image
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            value={row.selectedproduct}
                                                            onChange={(e) => handleRowChange(index, e)}
                                                            name="selectedproduct"
                                                        >
                                                            <option value="">Select Product</option>
                                                            {product.map(product => (

                                                                <option key={product.id} value={product.id}>{product.nom}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={row.categoryName}
                                                            readOnly
                                                            placeholder="Category Name"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={row.emplacementame}
                                                            readOnly
                                                            placeholder="Emplacement Name"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={row.prix}
                                                            readOnly
                                                            placeholder="Prix"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="Qte"
                                                            value={row.Qte}
                                                            onChange={(e) => handleRowChange(index, e)}
                                                            placeholder="Qte"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={`${row.prix * row.Qte} TND`}
                                                            readOnly
                                                            placeholder="Emplacement Name"
                                                        />

                                                    </td>

                                                </tr>


                                            ))}
                                            <tr>
                                                <td colSpan="6" className="text-end">Prix Total:</td>
                                                <td>{calculateTotalPrice()}TND</td>
                                            </tr>

                                        </tbody>

                                    </table>




                                </div>

                                <button type="button" style={{ float: 'right', width: '40px', height: '30px' }} className="plus" onClick={handleAddRow}>
                                    <img src="/plus.png" alt="Add Row" style={{ width: '100%', height: '100%' }} />
                                </button>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type="submit" className="btn btn-outline-success " onClick={generateRandomCode}>Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddExp;