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
        if (e.target.name == "name") {


        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }
    const hundleemplCreate = async (e) => {
        e.preventDefault();

        try {
            await axios.post(Constants.BASE_URL + '/emplacement', input)
                .then(res => {
                    console.log(res.data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    if (errors?.response?.data?.errors == null) {
                        Swal.fire({
                            title: 'Success',
                            text: 'emplacement ajouté avec succes',
                            icon: 'success',
                            showConfirmButton: false
                        });
                    }
                })
                .catch(errors => {
                    if (errors.response.status == 422) {
                        setErrors(errors.response.data.errors);
                    }
                });
        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding product:', error);
            Swal.fire('Error', 'quantité insuffisante', 'error');
        }
    };

    const [emplacements, setEmplacements] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/emplacement')
            .then(response => {
                console.log(response.data);
                setEmplacements(response.data);
                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    const deleteemplacement = (id) => {
        Swal.fire({
            title: 'Es-tu sûr?',
            text: "Vous allez le supprimer",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le !'
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
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Sample data for categories

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter categories based on search term
    const filteredCategories = emplacements.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current rows based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

    // Delete category by id
    const handleRowsPerPageChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setRowsPerPage(selectedValue);
    };

    // Render rows
    const renderRows = currentRows.map((category) => (
        <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.capacite}</td>
            <td>
                <Link to={`/EmplacementEdit/${category.id}`}>
                    <a
                        href=""

                        className="btn btn-default btn-sm"
                    >
                        <i style={{ color: "#ffcc00" }}><EditRounded /></i>
                    </a>
                </Link>
            </td>
            <td>
                <button
                    style={{ color: "red" }}
                    type="submit"
                    onClick={() => deleteemplacement(category.id)}
                    className="btn btn-outline-light"
                >
                    <Delete />
                </button>
            </td>

        </tr>
    ));

    // Render pagination links
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCategories.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPaginationLinks = pageNumbers.map((number) => (
        <li key={number} className="page-item">
            <a
                className="page-link link-dark"
                href="#"
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </a>
        </li>
    ));
    return (

        <>
            <BreadCumb title='Emplacements' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>
                                <h4>Emplacement</h4>

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
                                <div className="grid-child green">
                                    <div className="left">
                                        <select
                                            className="select-item selectWrapper"
                                            size={1}
                                            value={rowsPerPage} // Set the selected value based on the rowsPerPage state
                                            onChange={handleRowsPerPageChange} // Call the handleRowsPerPageChange function on change
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </select>

                                        <Form className="d-flex float-end">
                                            <Form.Control
                                                type="search"
                                                placeholder="recherche"
                                                className=""
                                                aria-label="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </Form>

                                        <div className="card-body">
                                            <table className="table">
                                                <thead className="table-success">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Nom</th>
                                                        <th scope="col">Capacité Disponible</th>
                                                        <th scope="col">Modifier</th>
                                                        <th scope="col">Supprimer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRows}
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination float-end">
                                                    <li className="page-item">
                                                        <a
                                                            className="page-link link-dark"
                                                            href="#"
                                                            onClick={() => setCurrentPage(currentPage - 1)}
                                                            disabled={currentPage === 1}
                                                        >
                                                            Precedent
                                                        </a>
                                                    </li>
                                                    {renderPaginationLinks}
                                                    <li className="page-item">
                                                        <a
                                                            className="page-link link-dark"
                                                            href="#"
                                                            onClick={() => setCurrentPage(currentPage + 1)}
                                                            disabled={currentPage === pageNumbers.length}
                                                        >
                                                            Suivant
                                                        </a>
                                                    </li>
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