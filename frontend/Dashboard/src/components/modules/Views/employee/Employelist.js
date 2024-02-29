import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaHandPaper, FaPlus, FaPlusSquare } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Description, EditRounded, History, HistoryRounded, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
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
import { Paper } from '@mui/material'

const Employelist = () => {
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
    const hundleInput = (e) => {
        if (e.target.name == "name") {
            let Slug = e.target.value
            Slug = Slug.toLowerCase()
            Slug = Slug.replaceAll(' ', '-')
            setInput(prevState => ({ ...prevState, Slug: Slug }))

        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }

    const hundleCategoryCreate = () => {
        axios.post(Constants.BASE_URL + '/category', input).then(res => {
            console.log(res.data)
        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )

    }
    const [fornisseur, setFornisseur] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/pvs')
            .then(response => {
                console.log(response.data);
                setFornisseur(response.data);
                setErrorMessage('');


            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);



    return (

        <>
            <BreadCumb title='fournisseur ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <Link to="/employee/Listeemployee">
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
                                                <th scope="col">nom</th>
                                                <th scope="col">mail</th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fornisseur.map(fornisseur => (
                                                <tr key={fornisseur.id}>
                                                    <td>{fornisseur.id}</td>
                                                    <td>{fornisseur.name}</td>
                                                    <td>{fornisseur.email}</td>
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

export default Employelist