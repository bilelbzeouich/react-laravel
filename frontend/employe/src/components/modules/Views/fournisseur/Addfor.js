import React, { useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, ListAltOutlined } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { ListItem } from '@mui/material';
import { List } from 'rsuite';
import Swal from 'sweetalert2';

const AddFor = () => {
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const hundleInput = (e) => {

        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }


    const hundleCategoryCreate = async (e) => {
        e.preventDefault();


        try {

            axios.post(Constants.BASE_URL + '/fournissuer', input).then(res => {
                console.log(res.data)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                if (errors?.response?.data?.errors == null) {
                    Swal.fire({
                        title: 'Success',
                        text: 'fournissuer ajouté avec succès',
                        icon: 'success',
                        showConfirmButton: false
                    });
                }
            }).catch(errors => {
                if (errors.response.status == 422) {
                    setErrors(errors.response.data.errors)
                }
            }
            )


        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding product:', error);
            Swal.fire('Error', 'quantité insuffisante', 'error');
        }
    }
    return (
        <>
            <BreadCumb title='Ajouter Fornisseur' />
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-header">

                            <div class="  d-flex  justify-content-between align-items-center">
                                <h4>Ajouter Fournisseur</h4>
                                <Link to="/fournisseur/liste">
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
                                            placeholder='Entre Fornisseur nom'
                                        />
                                        <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>e-mail</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='mail'
                                            type='texte'
                                            value={input.mail}
                                            onChange={hundleInput}
                                            placeholder='e-mail'
                                        />
                                        <p class="text-danger"><small>{errors.mail !== undefined ? errors.mail[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>adressse</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='localisation'
                                            type='texte'
                                            value={input.localisation}
                                            onChange={hundleInput}
                                            placeholder='Entre Fornisseur localisation'
                                        />
                                        <p class="text-danger"><small>{errors.localisation !== undefined ? errors.localisation[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>telephone</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='telephone'
                                            type='texte'
                                            value={input.telephone}
                                            onChange={hundleInput}
                                            placeholder='Entre Fornisseur telephone'
                                        />
                                        <p class="text-danger"><small>{errors.telephone !== undefined ? errors.telephone[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>rib bancaire</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='ribbancaire'
                                            type='texte'
                                            value={input.ribbancaire}
                                            onChange={hundleInput}
                                            placeholder='Entre Fornisseur rip bancaire'
                                        />
                                        <p class="text-danger"><small>{errors.ribbancaire !== undefined ? errors.ribbancaire[0] : null}</small></p>
                                    </label>
                                </div>

                                <div className='col-md-12'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4'>
                                            <div className='d-grid mt-4'>
                                                <button onClick={hundleCategoryCreate} className='btn btn-outline-success'>Ajouter</button>
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

export default AddFor