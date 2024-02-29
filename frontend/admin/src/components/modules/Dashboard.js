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


            <BreadCumb title='Dashboard' />
            <div class="row bg-gray ">


                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold  ">
                                        employés</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{fornisseur.length}</div>
                                </div>
                                <div class="col-auto">
                                    <Link to="/employee/liste">
                                        <img src={users}></img>
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
                                        Information Societe</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                                </div>
                                <div class="col-auto">
                                    <Link to="/Societe">
                                        <img src={societe}></img>
                                    </Link >
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