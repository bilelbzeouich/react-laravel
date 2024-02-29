import React, { useRef, useState } from 'react'
import BreadCumb from '../../partials/BreadCumb'
import '../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'



import logoPlaceholder from '../../../assets/img/logo.png';

const Societe = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const fileInputRef = useRef(null);

    const nomdef = localStorage.getItem('name');
    const emaildef = localStorage.getItem('email');
    const phonedef = localStorage.getItem('phone');
    const id = localStorage.getItem('id');


    const hundleInput = (e) => {

        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }


    function handleEmpCreate(e) {
        e.preventDefault();
        axios.put(Constants.BASE_URL + `/updatepv/${id}`, input).then(res => {
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
            <BreadCumb title='Utilisateur ' />
            <div class="wrap">

                <div class="container-fluid  justify-content-center">

                    <div class="row">
                        <div class="col-lg-8 col-xlg-9 col-md-7">
                            <div class="card">
                                <div class="card-body">
                                    <form class="form-horizontal form-material mx-2">
                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">Full Name</label>
                                            <div class="col-md-12">
                                                <input type="text"
                                                    name='name'
                                                    placeholder={nomdef}
                                                    value={input.name}
                                                    onChange={hundleInput}
                                                    class="form-control ps-0 form-control-line" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="example-email" class="col-md-12">Email</label>
                                            <div class="col-md-12">
                                                <input type="email" placeholder={emaildef}
                                                    name='mail'

                                                    value={input.mail}
                                                    onChange={hundleInput}
                                                    class="form-control ps-0 form-control-line"
                                                    id="example-email" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">Password</label>
                                            <div class="col-md-12">
                                                <input
                                                    name='password'

                                                    value={input.password}
                                                    onChange={hundleInput}
                                                    type="password"
                                                    placeholder='*******'
                                                    className="form-control ps-0 form-control-line"
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">telephone</label>
                                            <div class="col-md-12">
                                                <input type="text" placeholder={phonedef}
                                                    name='phone'

                                                    value={input.phone}
                                                    onChange={hundleInput}
                                                    class="form-control ps-0 form-control-line"></input>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">Message</label>
                                            <div class="col-md-12">
                                                <textarea rows="5" class="form-control ps-0 form-control-line"></textarea>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <div class="col-sm-12 d-flex">
                                                <button
                                                    className="btn btn-success mx-auto mx-md-0 text-white"
                                                    style={{
                                                        margin: '10px',

                                                    }}
                                                    onClick={handleEmpCreate}
                                                >
                                                    Modifier Profile
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div >
            </div >

        </>
    )
}

export default Societe