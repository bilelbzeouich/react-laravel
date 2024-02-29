import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaEye, FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
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
import Swal from 'sweetalert2'

const ListExp = () => {
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


    const mergedLivraison = [];
    livraison.forEach((livraisonItem) => {
        const existingItemIndex = mergedLivraison.findIndex((item) => item.ref === livraisonItem.ref);
        if (existingItemIndex !== -1) {
            mergedLivraison[existingItemIndex].prix += livraisonItem.prix * livraisonItem.qte;
        } else {
            mergedLivraison.push({ ...livraisonItem, prix: livraisonItem.prix * livraisonItem.qte });
        }
    });
    const deleteCategory = (id) => {
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
                    axios.delete(Constants.BASE_URL + `/livraisonss/${id}`)
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
    const handleRowsPerPageChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setRowsPerPage(selectedValue);
    };
    // Sample data for categories


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter categories based on search term
    const filteredCategories = mergedLivraison
        ? mergedLivraison.filter((client) =>
            client.ref.toLowerCase().includes(searchTerm.toLowerCase())

        )
        : [];

    // Get current rows based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

    // Delete category by id


    // Render rows
    const renderRows = currentRows.map((livraison) => (
        <tr key={livraison.id}>
            <td scope="row">{livraison.ref}</td>
            <td>{livraison.client.name}</td>
            <td>{livraison.date_livraison}</td>
            <td>{livraison.prix.toFixed(2)}
            </td>
            <td>
                <Link to={`/View/${livraison.ref}`}>
                    <a href="#" className="btn btn-default btn-sm">
                        <i style={{ color: '#2E8BC0' }}>
                            <FaEye />
                        </i>
                    </a>
                </Link>
            </td>
            <td>
                <a href="#" onClick={() => deleteCategory(livraison.ref)} className="btn btn-default btn-sm">
                    <i style={{ color: 'red' }}>
                        <Delete />
                    </i>
                </a>
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

                            </Stack>


                        </div>

                        <div className="card-body">
                            <div>
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
                                                <th scope="col">#ref</th>
                                                <th scope="col">Client</th>
                                                <th scope="col">Date livraison</th>
                                                <th scope="col">Prix</th>
                                                <th scope="col">View</th>
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
                </div >
            </div >

        </>
    )
}

export default ListExp