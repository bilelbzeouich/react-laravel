import React, { useEffect, useState } from 'react'
import BreadCumb from '../partials/BreadCumb'
import products from '../../assets/img/icons8-produit-64.png'
import users from '../../assets/img/icons8-utilisateur-48.png'
import Fournissuer from '../../assets/img/icons8-fournisseur-48.png'
import societe from '../../assets/img/icons8-société-48.png'
import vente from '../../assets/img/caisse.png'

import axios from 'axios'
import Constants from '../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Edit, EditRounded, EvStationSharp, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import { CChart } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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
    const [fornisseur, setFornisseur] = useState([]);

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/fournissuer')
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
    const [clients, setClients] = useState([]);


    useEffect(() => {
        axios.get(Constants.BASE_URL + '/client')
            .then(response => {
                console.log(response.data);
                setClients(response.data);
                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    const fornisseurcount = fornisseur.length;
    const productCount = product.length;

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
    const filteredCategories = product
        ? product.filter((client) =>
            client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||

            client.code_produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.emplacement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Get current rows based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

    // Delete category by id


    // Render rows
    const renderRows = currentRows.map((product) => (
        <tr key={product.id}>
            <td>
                <img src={"/" + product.image} alt={product.name} className="produit" />
            </td>
            <td>{product.nom}</td>
            <td>{product.category.name}</td>
            <td>{product.emplacement.name}</td>
            <td>{product.code_produit}</td>
            <td>{product.qte}</td>




            <td>{product.date_expiration}</td>







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
    const [rapport, setRapport] = useState([]);

    const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/rapport')
            .then(response => {
                console.log(response.data);
                setRapport(response.data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        rapport.forEach(item => {
            const monthIndex = new Date(item.date_livraison).getMonth();
            newData[monthIndex] += item.prix / 1000;
        });
        setData(newData);
    }, [rapport]);
    return (
        <>


            <BreadCumb title='Dashboard' />
            <div class="row bg-gray ">

                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold  ">
                                        Produits</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{productCount}</div>
                                </div>

                                <div class="col-auto">
                                    <Link to="/EtatStock">
                                        <img src={products}></img>
                                    </Link >
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold  ">
                                        Fournissuer</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{fornisseurcount}</div>
                                </div>
                                <div class="col-auto">
                                    <Link to="/fournisseur/liste">
                                        <img src={Fournissuer}></img>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold  ">
                                        Clients</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{clients.length}</div>
                                </div>
                                <div class="col-auto">
                                    <Link to="/Clients/liste">
                                        <img src={users}></img>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="col-md-12">
                    <div class="card">

                        <div class="card-body ">
                            <div className="size-card left">
                                <CChart
                                    type="bar"
                                    data={{
                                        labels: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                                        datasets: [
                                            {
                                                label: 'vente',
                                                backgroundColor: '#4BB543',
                                                data: data,
                                            },
                                        ],
                                    }}
                                    labels="months"
                                />
                            </div>
                            <div class="size-card-cercle right ">
                                <CChart
                                    type="doughnut"
                                    data={{
                                        labels: ['agricole', 'outils', 'equipement', 'pompe'],
                                        datasets: [
                                            {
                                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                                data: [40, 20, 80, 10],
                                            },
                                        ],
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card">

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
                                                <th scope="col">IMAGE</th>
                                                <th scope="col">NOM PRODUIT</th>
                                                <th scope="col">CATEGORY</th>
                                                <th scope="col">EMPLACEMENT</th>
                                                <th scope="col">CODE PRODUIT</th>
                                                <th scope="col">QUANTITY</th>
                                                <th scope="col"> date d'expiration</th>


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




            </div >
        </>
    )
}

export default Dashboard