import React, { useState } from 'react'
import BreadCumb from '../../partials/BreadCumb'
import '../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";

const User = () => {
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


        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }

    const hundleUserCreate = () => {
        axios.post(Constants.BASE_URL + '/user', input).then(res => {
            console.log(res.data)
        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )

    }



    return (

        <>
            <BreadCumb title='Utilisateur ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <div className=" border ms-auto">
                                    <button type="button" class="btn btn-outline-danger"><FaFilePdf /></button>
                                </div>
                                <div className=" border">
                                    <button type="button" class="btn btn-outline-success"><FaFileExcel /></button>
                                </div>
                            </Stack>



                        </div>
                        <div class="card-body">
                            <div class="grid-container">

                                <div class="grid-child purple">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label className='w-100'>
                                                <p>Nom</p>
                                                <input
                                                    className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                    name='name'
                                                    type='texte'
                                                    value={input.name}
                                                    onChange={hundleInput}
                                                    placeholder='Entre  Nom'
                                                />
                                                <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                            </label>
                                        </div>
                                        <div className='col-md-6'>
                                            <label className='w-100 '>
                                                <p>Email</p>
                                                <input
                                                    className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                    name='Email'
                                                    type='texte'
                                                    value={input.Email}
                                                    onChange={hundleInput}
                                                    placeholder='Entre Email'
                                                />
                                                <p class="text-danger"><small>{errors.Email !== undefined ? errors.Email[0] : null}</small></p>
                                            </label>
                                        </div>
                                        <div className='col-md-6'>
                                            <label className='w-100 '>
                                                <p>Mot de passe</p>
                                                <input
                                                    className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                    name='mdp'
                                                    type='password'
                                                    value={input.password}
                                                    onChange={hundleInput}
                                                    placeholder='Entre mot de passe'
                                                />
                                                <p class="text-danger"><small>{errors.password !== undefined ? errors.password[0] : null}</small></p>
                                            </label>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='row justify-content-center'>
                                                <div className='col-md-4'>
                                                    <div className='d-grid mt-4'>
                                                        <button onClick={hundleUserCreate} className='btn btn-outline-success'>Ajouter</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid-child green">
                                    <div classe="left">


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
                                                        <th scope="col">Nom</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Supprimer</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Email@test.com</td>


                                                        <td>     <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                            <i class="fas fa-trash fa-lg" style={{ color: "red" }} title="Supprimer"></i>
                                                        </a></td>
                                                        <td>
                                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                <i class="fas fa-edit fa-lg" style={{ color: "blue" }} title="Modifier"></i>
                                                            </a>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Email@test.com</td>


                                                        <td>     <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                            <i class="fas fa-trash fa-lg" style={{ color: "red" }} title="Supprimer"></i>
                                                        </a></td>
                                                        <td>
                                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                <i class="fas fa-edit fa-lg" style={{ color: "blue" }} title="Modifier"></i>
                                                            </a>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Email@test.com</td>


                                                        <td>     <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                            <i class="fas fa-trash fa-lg" style={{ color: "red" }} title="Supprimer"></i>
                                                        </a></td>
                                                        <td>
                                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                <i class="fas fa-edit fa-lg" style={{ color: "blue" }} title="Modifier"></i>
                                                            </a>
                                                        </td>

                                                    </tr>
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
                    </div>
                </div>
            </div >

        </>
    )
}

export default User