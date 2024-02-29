import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, EditRounded, History, HistoryRounded, KeyboardReturnOutlined, ListAltOutlined, PictureAsPdfOutlined, PlusOneOutlined, StoreRounded, UpdateDisabledOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}




const Panier = () => {

    const [paniers, setPaniers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const value = localStorage.getItem('id');
    const [selectedemplacement, setSelectedemplacement] = useState(null);
    useEffect(() => {
        axios.get(Constants.BASE_URL + `/caretpvs/${value}`)
            .then(response => {
                console.log(response.data);
                const { data } = response; // Extract the data directly from the response
                setPaniers(data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    const deleteproduit = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    axios.delete(Constants.BASE_URL + `/card/${id}`)
                        .then(response => {
                            console.log(response.data.message);
                            window.location.reload()
                            // Reload the category list or perform other actions as needed
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        })
    }
    let prixTotal = 0;
    paniers.forEach(panier => {
        prixTotal += panier.quantity * panier.price;
    });
    const [emplacements, setEmplacements] = useState([]);


    useEffect(() => {
        axios.get(Constants.BASE_URL + `/emplacementpvs/${value}`)
            .then(response => {
                console.log(response.data);
                const { data } = response; // Extract the data directly from the response
                setEmplacements(data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    const [randomCode, setRandomCode] = useState('');
    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        setRandomCode(code);
    };
    const [quantities, setQuantities] = useState(Array().fill(0));
    const hundleaddpanier = async (e) => {
        e.preventDefault();
        const pv_id = localStorage.getItem('id');
        const phone = localStorage.getItem('phone');
        const email = localStorage.getItem('email');

        const promises = paniers.map(panier => {
            const formData = new FormData();
            formData.append('name', randomCode);
            formData.append('email', panier.email);
            formData.append('phone', panier.phone);
            formData.append('address', 'point du vente');
            formData.append('product_title', panier.name);
            formData.append('price', panier.price);
            formData.append('quantity', panier.quantity);
            formData.append('image', panier.image);
            formData.append('pv_id', panier.pv_id);
            formData.append('product_id', panier.product_id);
            formData.append('delivery_status', "attente");
            formData.append('emplacementpv_id', selectedemplacement);

            return axios.post(Constants.BASE_URL + '/commande', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        });


        Promise.all(promises)
            .then(responses => {
                // Handle the responses
            })
            .catch(error => {
                console.error('Error adding product:', error);
                Swal.fire('Error', 'ERROR', 'error');
            });
    };



    return (

        <>
            <form onSubmit={hundleaddpanier} enctype="multipart/form-data">
                <BreadCumb title='Reception ' />
                <div class="wrap">

                    <div class="col-md-12">
                        <div class="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/reception/add">
                                        <Button type="primary" class="right_button" variant="outline-success" >
                                            <KeyboardReturnOutlined />
                                        </Button>
                                    </Link>
                                    <Link to="/reception/liste">
                                        <Button type="primary" className="right_button" variant="outline-success">
                                            <ListAltOutlined />
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                            <div class="card-body">
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paniers.map(paniers => (
                                                <TableRow key={paniers.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell >
                                                        <img src={"/" + paniers.image} alt={paniers.name} className="produit" style={{ width: '10%' }} />

                                                    </TableCell>
                                                    <TableCell align="right">{paniers.name}</TableCell>
                                                    <TableCell align="right">{paniers.quantity}</TableCell>
                                                    <TableCell align="right">{paniers.quantity * paniers.price}TND</TableCell>

                                                    <TableCell align="right">
                                                        <button style={{ color: "red" }} type="submit" onClick={() => { deleteproduit(paniers.id) }} class="btn btn-outline-light"><Delete /></button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableCell align="right">
                                                <select class="form-select" aria-label="Default select example"
                                                    style={{ width: '30%' }}
                                                    value={selectedemplacement}
                                                    onChange={(e) => setSelectedemplacement(e.target.value)}>
                                                    <option selected>emplacement</option>
                                                    {emplacements.map((emplacements) => (
                                                        <option key={emplacements.id} value={emplacements.id}>{emplacements.name}</option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"><strong>PrixTotal:</strong></TableCell>
                                            <TableCell align="right">{prixTotal}TND</TableCell>

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>

                            <div className='row justify-content-center'>

                                <button
                                    className='btn btn-outline-success'
                                    type="submit"
                                    onClick={generateRandomCode}



                                    style={{ margin: '10px', width: '20%' }}
                                >
                                    Commander
                                </button>


                            </div>


                        </div>
                    </div>
                </div >
            </form>
        </>
    )
}

export default Panier