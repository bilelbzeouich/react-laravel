import React, { useState } from 'react'
import BreadCumb from '../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../Constants';

const AddCategory = () => {
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const hundleInput = (e) => {
        const token = localStorage.getItem('token');
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value, token_id: token.id }))



    }

    const hundleCategoryCreate = () => {
        axios.post(Constants.BASE_URL + '/category', input).then(res => {
            console.log(res.data)
        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )


    }
    return (
        <>
            <BreadCumb title='Add Category' />
            <div class="row">
                <div class="col-md-12">
                    <div class="card">

                        <div class="card-header">

                            <div class="  d-flex  justify-content-between align-items-center">
                                <h4>Add Category</h4>
                                <button className='btn btn-outline-primary'><Link to={''} ><i class=" fa-solid fa-list"></i></Link></button>
                            </div>

                        </div>

                        <div class="card-body">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label className='w-100'>
                                        <p>Name</p>
                                        <input
                                            className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='name'
                                            type='texte'
                                            value={input.name}
                                            onChange={hundleInput}
                                            placeholder='Entre Category Name'
                                        />
                                        <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>Slug</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='Slug'
                                            type='texte'
                                            value={input.Slug}
                                            onChange={hundleInput}
                                            placeholder='Entre Category Slug'
                                        />
                                        <p class="text-danger"><small>{errors.Slug !== undefined ? errors.Slug[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>Serial</p>
                                        <input
                                            className={errors.Slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='Serial'
                                            type='Number'
                                            value={input.Serial}
                                            onChange={hundleInput}
                                            placeholder='Entre Category Serial Number'
                                        />
                                        <p class="text-danger"><small>{errors.Serial !== undefined ? errors.Serial[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>status</p>
                                        <select
                                            className={errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-control mt-2'}
                                            name='status'
                                            value={input.status}
                                            onChange={hundleInput}
                                            placeholder='select Category status'
                                        >
                                            <option disabled='true'>select Category status</option>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                        <p class="text-danger"><small>{errors.status !== undefined ? errors.status[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100 '>
                                        <p>Description</p>
                                        <textarea
                                            className={errors.Description != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='Description'
                                            value={input.Description}
                                            onChange={hundleInput}
                                            placeholder='Entre Category Description'
                                        />
                                        <p class="text-danger"><small>{errors.Description !== undefined ? errors.Description[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-12'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4'>
                                            <div className='d-grid mt-4'>
                                                <button onClick={hundleCategoryCreate} className='btn btn-outline-success'>Add Category</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory