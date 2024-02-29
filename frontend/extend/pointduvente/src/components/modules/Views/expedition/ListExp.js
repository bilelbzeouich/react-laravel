import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, EditRounded, History, HistoryRounded, PictureAsPdfOutlined, PlusOneOutlined, Print, PrintDisabledOutlined, UpdateDisabledOutlined } from '@mui/icons-material'
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

const ListExp = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;




    const [livraison, setLivraison] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        axios.get(Constants.BASE_URL + '/livraison')
            .then(response => {
                console.log(response.data);
                setLivraison(response.data);
                setErrorMessage('');


            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);



    return (

        <>
            <BreadCumb title='Liste des Bon Livraison ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <Link to="/expedition/Add">
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
                                                <th scope="col">#</th>
                                                <th scope="col">Nom Client</th>
                                                <th scope="col">Date livraison</th>
                                                <th scope="col">Imprimer</th>
                                                <th scope="col">Modifier</th>
                                                <th scope="col">Supprimer</th>



                                            </tr>
                                        </thead>
                                        <tbody>


                                            {livraison.map(livraison => (
                                                <tr key={livraison.id}>
                                                    <td scope="row">{livraison.id}</td>
                                                    <td>{livraison.client.prenom}</td>
                                                    <td>{livraison.date_livraison}</td>

                                                    <td>
                                                        <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                            <i style={{ color: "#2E8BC0" }} ><Print /></i>
                                                        </a></td>
                                                    <td>
                                                        <Link to={`/EditExpedition/${livraison.id}`}>
                                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                <i style={{ color: "	#ffcc00" }} ><EditRounded /></i>
                                                            </a></Link>
                                                    </td>
                                                    <td>
                                                        <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                            <i style={{ color: "	red" }} ><Delete /></i>
                                                        </a></td>




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

export default ListExp