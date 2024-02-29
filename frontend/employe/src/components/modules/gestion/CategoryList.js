import BreadCumb from '../../partials/BreadCumb'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../Constants';



const CategoryList = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const hundleInput = (e) => {
        if (e.target.name == "name") {
            let Slug = e.target.value
            Slug = Slug.toLowerCase()
            Slug = Slug.replaceAll(' ', '-')
            setInput(prevState => ({ ...prevState, Slug: Slug }))

        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


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
            <BreadCumb title='Category List' />
            <div class="wrap">

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



                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>test</td>
                                        <th>
                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                <i class="fas fa-edit fa-lg" style={{ color: "blue" }} title="Modifier"></i>
                                            </a>

                                            <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                                <i class="fas fa-trash fa-lg" style={{ color: "red" }} title="Supprimer"></i>
                                            </a>

                                        </th>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )
}

export default CategoryList