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
import { Delete, EditRounded, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Emplacement = () => {
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

        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));




    }

    const value = localStorage.getItem('id');
    const hundleemplCreate = () => {

        const updatedInput = { ...input, pv_id: value };
        axios.post(Constants.BASE_URL + '/emplacementpv', updatedInput).then(res => {
            console.log(res.data)
            window.location.reload()

        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )
    }

    const [emplacements, setEmplacements] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

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
    const deleteemplacement = (id) => {
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
                    axios.delete(Constants.BASE_URL + `/emplacement/${id}`)
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
            <BreadCumb title='Emplacements' />
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
                                                    placeholder='Entre Nom'
                                                />
                                                <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                            </label>
                                        </div>
                                        <div className='col-md-6'>
                                            <label className='w-100 '>
                                                <p>Capacité Maximale</p>
                                                <input
                                                    className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                    name='capacite'
                                                    type='number'
                                                    value={input.capacite}
                                                    onChange={hundleInput}
                                                    placeholder='Entre Capacité Maximale'
                                                />
                                                <p class="text-danger"><small>{errors.capacite !== undefined ? errors.capacite[0] : null}</small></p>
                                            </label>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='row justify-content-center'>
                                                <div className='col-md-4'>
                                                    <div className='d-grid mt-4'>
                                                        <button onClick={hundleemplCreate} className='btn btn-outline-success'>Ajouter</button>
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
                                                        <th scope="col">Capacité Disponible</th>
                                                        <th scope="col">Modifier</th>
                                                        <th scope="col">Supprimer</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {emplacements && emplacements.map(emplacements => (
                                                        <tr key={emplacements.id}>
                                                            <td>{emplacements.id}</td>
                                                            <td>{emplacements.name}</td>
                                                            <td>{emplacements.capacite}</td>
                                                            <td>
                                                                <Link to={`/EmplacementEdit/${emplacements.id}`}>
                                                                    <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                                        <i style={{ color: "	#ffcc00" }} ><EditRounded /></i>
                                                                    </a></Link>
                                                            </td>
                                                            <td>
                                                                <button style={{ color: "red" }} type="submit" onClick={() => { deleteemplacement(emplacements.id) }} class="btn btn-outline-light"><Delete /></button>

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
                    </div>
                </div>
            </div >

        </>
    )
}

export default Emplacement