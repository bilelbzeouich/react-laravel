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
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;






    const [product, setProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [stock, setStock] = useState([]);
    const value = localStorage.getItem('id');
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, stockResponse, clientsResponse] = await Promise.all([
                    axios.get(Constants.BASE_URL + '/produit'),
                    axios.get(Constants.BASE_URL + `/stockpv/${value}`),
                    axios.get(Constants.BASE_URL + `/clientpvs/${value}`)
                ]);

                setProduct(productResponse.data);
                setStock(stockResponse.data);
                setClients(clientsResponse.data);
                setErrorMessage('');
            } catch (error) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
        };

        fetchData();
    }, []);



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
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{stock.length}</div>
                                </div>
                                <div class="col-auto">
                                    <Link to="/EtatStock">
                                        <img src={products}></img>
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
                            <div class="size-card .left">
                                <CChart
                                    type="bar"
                                    data={{
                                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                        datasets: [
                                            {
                                                label: 'Vente',
                                                backgroundColor: '#4BB543',
                                                data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
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
                                        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
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

export default Dashboard