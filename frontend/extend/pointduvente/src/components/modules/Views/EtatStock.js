import React, { useEffect, useState } from 'react'
import BreadCumb from '../../partials/BreadCumb'
import '../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, Edit, EditRounded, EvStationSharp, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import prod from '../../../assets/img/prod.jpg';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const EtatStock = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;




    const [stock, setStock] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const value = localStorage.getItem('id');
    useEffect(() => {
        axios.get(Constants.BASE_URL + `/stockpv/${value}`)
            .then(response => {
                console.log(response.data);
                const { data } = response; // Extract the data directly from the response
                setStock(data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);



    return (

        <>
            <BreadCumb title='Etat De Stock' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>
                                <div className="">
                                    <Link to="/reception/add">
                                        <Button type="primary" class="right_button" variant="outline-success" >
                                            <FaPlus />
                                        </Button>
                                    </Link></div>

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
                                                <th scope="col">IMAGE</th>
                                                <th scope="col">NOM PRODUIT</th>
                                                <th scope="col">CATEGORY</th>
                                                <th scope="col">EMPLACEMENT</th>
                                                <th scope="col">Date expiration</th>
                                                <th scope="col">QUANTITY</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stock.map((item) => (
                                                item.produit && (
                                                    <tr key={item.count.id}>
                                                        <td>
                                                            {item.produit.image && <img src={"/" + item.produit.image} alt={item.produit.name} className="produit" />}
                                                        </td>
                                                        <td>{item.produit.nom}</td>
                                                        <td>{item.category.name}</td>
                                                        <td>{item.emplacement.name}</td>
                                                        <td>{item.produit.date_expiration}</td>
                                                        <td>{item.count.qte}</td>
                                                    </tr>
                                                )
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

export default EtatStock