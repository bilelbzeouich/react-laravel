import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, EditRounded, History, HistoryRounded, PictureAsPdfOutlined, PlusOneOutlined, UpdateDisabledOutlined } from '@mui/icons-material'
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



const ListeRecep = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;



    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [product, setProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/produit')
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
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
                    axios.delete(Constants.BASE_URL + `/produit/${id}`)
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

    return (

        <>
            <BreadCumb title='Reception ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <Link to="/reception/add">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <FaPlus />
                                    </Button>
                                </Link>
                                <div className=" border ms-auto">
                                    <button type="button" class="btn btn-outline-danger"><FaFilePdf /></button>
                                </div>
                                <div className=" border">
                                    <button type="button" class="btn btn-outline-success"><FaFileExcel /></button>
                                </div>
                            </Stack>


                        </div>
                        <div class="card-body">

                            <div>


                                <select class=" select-item selectWrapper" size={1} >
                                    <option selected>10</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>


                                <Form className="d-flex float-end">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className=""
                                        aria-label="Search"
                                    />

                                </Form>
                                <div class="card-body">
                                    <table class="table">
                                        <thead class="table-success">
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Nom Produit</th>
                                                <th scope="col">Category</th>

                                                <th scope="col">Emplacement</th>
                                                <th scope="col">Fornisseur</th>
                                                <th scope="col">quantite</th>
                                                <th scope="col">prix</th>
                                                <th scope="col">Code Produit</th>
                                                <th scope="col">Date expiration</th>
                                                <th scope="col">supprimer</th>
                                                <th scope="col">Modifier</th>


                                            </tr>
                                        </thead>
                                        <tbody>

                                            {product.map(product => (
                                                <tr key={product.id}>
                                                    <td>
                                                        <img src={"/" + product.image} alt={product.name} className="produit" />
                                                    </td>
                                                    <td>{product.nom}</td>
                                                    <td>{product.category.name}</td>
                                                    <td>{product.emplacement.name}</td>
                                                    <td>{product.fornissuer.name}</td>
                                                    <td>{product.qte}</td>
                                                    <td>{product.prix}</td>
                                                    <td>{product.code_produit}</td>
                                                    <td>{product.date_expiration}</td>




                                                    <td>
                                                        <button style={{ color: "red" }} type="submit" onClick={() => { deleteproduit(product.id) }} class="btn btn-outline-light"><Delete /></button>

                                                    </td>
                                                    <td>
                                                        <Link to={`/productEdit/${product.id}`}>
                                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                <i style={{ color: "	#ffcc00" }} ><EditRounded /></i>
                                                            </a></Link>
                                                    </td>




                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example ">
                                        <ul class="pagination float-end">
                                            <li class="page-item"><a class="page-link link-dark" href="#">Previous</a></li>
                                            <li class="page-item"><a class="page-link link-dark" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link link-dark" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link link-dark" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link link-dark" href="#">Next</a></li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default ListeRecep