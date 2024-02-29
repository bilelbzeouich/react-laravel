import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'
import '../../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { BackTop, Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Category, Delete, KeyboardReturnOutlined, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
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
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EditCategory = () => {
    const { categoryId } = useParams();
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

    const hundleemplCreate = () => {
        axios.put(Constants.BASE_URL + `/categories/${categoryId}`, input).then(res => {
            console.log(res.data)
            window.location.reload()
        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )
    }


    const [errorMessage, setErrorMessage] = useState('');
    const [category, setCategory] = useState(null);

    // ...

    useEffect(() => {
        axios.get(Constants.BASE_URL + `/categories/${categoryId}`)
            .then(response => {
                console.log(response.data);
                const categoryData = response.data;

                // Check if the response data is a valid category object
                if (typeof categoryData === 'object' && categoryData !== null) {
                    setCategory(categoryData);
                } else {
                    setErrorMessage('Invalid category data');
                }
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    return (


        <>
            <BreadCumb title='EditCategory' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">


                            <Stack direction="horizontal" gap={3}>
                                <div className="">

                                    <Link to="/Category">
                                        <Button type="primary" class="right_button" variant="outline-success" >
                                            <KeyboardReturnOutlined />
                                        </Button>
                                    </Link>
                                </div>
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

                                        <label className='w-100'>
                                            <p>Nom</p>
                                            <input
                                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name='name'
                                                type='texte'
                                                value={input.name}
                                                onChange={hundleInput}
                                                placeholder={category ? category.name : 'Enter Category Name'}
                                            />
                                            <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                        </label>


                                        <div className='col-md-12'>
                                            <div className='row justify-content-center'>
                                                <div className='col-md-4'>
                                                    <div className='d-grid mt-4'>
                                                        <button onClick={hundleemplCreate} className='btn btn-outline-warning'>Editer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid-child green">
                                    <div classe="left">






                                        <div class="card-body">
                                            <table class="table">
                                                <thead class="table-success">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Nom</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {category !== null ? (
                                                        <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.name}</td>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="2">No category found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default EditCategory;
