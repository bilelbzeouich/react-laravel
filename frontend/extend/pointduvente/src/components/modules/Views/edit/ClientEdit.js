import React, { useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, KeyboardReturnOutlined, ListAltOutlined } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { ListItem } from '@mui/material';
import { List } from 'rsuite';
import { useEffect } from 'react';

const AddClient = () => {
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const { clientId } = useParams();
    const hundleInput = (e) => {
        if (e.target.name == "name") {


        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }

    const hundleClientCreate = () => {
        axios.put(Constants.BASE_URL + `/clientpvs/${clientId}`, input).then(res => {
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
    const [client, setClient] = useState(null);

    // ...

    useEffect(() => {
        axios.get(Constants.BASE_URL + `/clientspvs/${clientId}`)
            .then(response => {
                console.log(response.data);
                const categoryData = response.data;

                // Check if the response data is a valid category object
                if (typeof categoryData === 'object' && categoryData !== null) {
                    setClient(categoryData);
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
            <BreadCumb title='Ajouter Utilisateur' />
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-header">

                            <div class="  d-flex  justify-content-between align-items-center">
                                <h4>Editer Utilisateur</h4>
                                <Link to="/Clients/liste">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <KeyboardReturnOutlined />
                                    </Button>
                                </Link>
                            </div>

                        </div>

                        <div class="card-body">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label className='w-100'>
                                        <p>nom</p>
                                        <input
                                            className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='name'
                                            type='texte'
                                            value={input.name}
                                            onChange={hundleInput}

                                            placeholder={client ? client.name : 'Entre Utilisateur nom'}
                                        />
                                        <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>prenom</p>
                                        <input
                                            className={errors.Prenom != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='prenom'
                                            type='texte'
                                            value={input.prenom}
                                            onChange={hundleInput}


                                            placeholder={client ? client.prenom : 'Entre Utilisateur Prenom'}
                                        />
                                        <p class="text-danger"><small>{errors.prenom !== undefined ? errors.prenom[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>localisation</p>
                                        <input
                                            className={errors.localisation != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='localisation'
                                            type='texte'
                                            value={input.localisation}
                                            onChange={hundleInput}
                                            placeholder={client ? client.localisation : 'Entre Utilisateur Localisation'}
                                        />
                                        <p class="text-danger"><small>{errors.localisation !== undefined ? errors.localisation[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>telephone</p>
                                        <input
                                            className={errors.telephone != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='telephone'
                                            type='texte'
                                            value={input.telephone}
                                            onChange={hundleInput}
                                            placeholder={client ? client.telephone : 'Entre Utilisateur telephone'}
                                        />
                                        <p class="text-danger"><small>{errors.telephone !== undefined ? errors.telephone[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>rib bancaire</p>
                                        <input
                                            className={errors.ribbancaire != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='ribbancaire'
                                            type='texte'
                                            value={input.ribbancaire}
                                            onChange={hundleInput}
                                            placeholder={client ? client.ribbancaire : 'Entre Utilisateur rip bancaire'}
                                        />
                                        <p class="text-danger"><small>{errors.ribbancaire !== undefined ? errors.ribbancaire[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-12'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4'>
                                            <div className='d-grid mt-4'>
                                                <button onClick={hundleClientCreate} className='btn btn-outline-warning'>Editer</button>
                                            </div>
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
}

export default AddClient