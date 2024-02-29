import React, { useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, ListAltOutlined } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { ListItem } from '@mui/material';
import { List } from 'rsuite';

const AddClient = () => {
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const hundleInput = (e) => {
        if (e.target.name == "name") {


        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }
    const value = localStorage.getItem('id');
    const updatedInput = { ...input, pv_id: value };
    const hundleClientCreate = () => {
        axios.post(Constants.BASE_URL + '/clientpv', updatedInput).then(res => {
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
            <BreadCumb title='Ajouter Utilisateur' />
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-header">

                            <div class="  d-flex  justify-content-between align-items-center">
                                <h4>Ajouter Utilisateur</h4>
                                <Link to="/Clients/liste">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <ListAltOutlined />
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
                                            placeholder='Entre Utilisateur nom'
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
                                            placeholder='Entre Utilisateur Prenom'
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
                                            placeholder='Entre Utilisateur Localisation'
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
                                            placeholder='Entre Utilisateur telephone'
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
                                            placeholder='Entre Utilisateur rip bancaire'
                                        />
                                        <p class="text-danger"><small>{errors.ribbancaire !== undefined ? errors.ribbancaire[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-12'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4'>
                                            <div className='d-grid mt-4'>
                                                <button onClick={hundleClientCreate} className='btn btn-outline-success'>Ajouter</button>
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