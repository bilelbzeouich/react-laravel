import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'
import '../../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaEye, FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { CancelOutlined, Delete, DoNotDisturb, Edit, EditRounded, EvStationSharp, PictureAsPdfOutlined, PlusOneOutlined, Verified } from '@mui/icons-material'
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
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const Commande = () => {
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
    const [commande, setCommande] = useState([]);


    const uniqueNames = [...new Set(commande.map(item => item.name))];
    const [errorMessage, setErrorMessage] = useState('');
    const value = localStorage.getItem('id');
    useEffect(() => {
        axios.get(Constants.BASE_URL + `/commandeviews`)
            .then(response => {
                console.log(response.data);
                const { data } = response; // Extract the data directly from the response
                setCommande(data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);



    const deleteproduit = (id) => {
        axios.put(Constants.BASE_URL + `/commandepvs/${id}`, input).then(res => {
            console.log(res.data)
            window.location.reload()

        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )
    }

    return (

        <>
            <BreadCumb title='Commande' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>
                                <div className="">
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
                                                <th scope="col">Ref</th>
                                                <th scope="col">Prix</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Etat</th>
                                                <th scope="col">affiche</th>
                                                <th scope="col"> Verifier</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uniqueNames.map(name => {
                                                const filteredCommandes = commande.filter(item => item.name === name);
                                                const sum = filteredCommandes.reduce((total, item) => total + item.price * item.quantity, 0);
                                                const dates = filteredCommandes.map(item => new Date(item.created_at).toLocaleDateString());
                                                const deliveryStatuses = filteredCommandes.map(item => item.delivery_status);
                                                const deliveryStatus = deliveryStatuses.length > 0 ? deliveryStatuses[0] : '-';
                                                const textColor = deliveryStatus === 'attente' ? '#FFC000' : 'green'; // Define text color based on delivery status

                                                return (
                                                    <tr key={name}>
                                                        <td>{name}</td>
                                                        <td>{sum} TND</td>
                                                        <td>{dates.length > 0 ? dates[0] : '-'}</td>
                                                        <td style={{ color: textColor }}>{deliveryStatus}</td> {/* Apply text color based on delivery status */}
                                                        <td>
                                                            <Link to={`/view/commande/${name}`}>
                                                                <a href="" className="btn btn-default btn-sm">
                                                                    <i style={{ color: "#FFC000" }}><FaEye /></i>
                                                                </a>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button style={{ color: "green" }} onClick={() => deleteproduit(name)} className="btn btn-outline-light">
                                                                <CreditScoreIcon />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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

export default Commande