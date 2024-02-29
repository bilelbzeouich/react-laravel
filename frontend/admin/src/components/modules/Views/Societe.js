import React, { useRef, useState } from 'react'
import BreadCumb from '../../partials/BreadCumb'
import '../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaEdit, FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'



import logoPlaceholder from '../../../assets/img/logo.png';
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const Societe = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const fileInputRef = useRef(null);

    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;
    const nomdef = localStorage.getItem('name');
    const emaildef = localStorage.getItem('email');
    const phonedef = localStorage.getItem('phone');

    const hundleInput = (e) => {
        if (e.target.name === "selectedImage") {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
        }
    };



    const iconStyle = {
        // Define your icon styles here
        color: 'blue',
        fontSize: '10px',
        cursor: 'pointer',
    };
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleImageRemove = () => {
        setSelectedImage(null);
    };
    const [societe, setSociete] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        axios.get(Constants.BASE_URL + '/societe')
            .then(response => {
                console.log(response.data);
                setSociete(response.data);
                setErrorMessage('');


            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    const hundleemplCreate = async (e) => {
        e.preventDefault();


        try {

            axios.put(Constants.BASE_URL + `/societe/${2}`, input).then(res => {
                console.log(res.data)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                if (errors?.response?.data?.errors == null) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Profile modifié avec succès',
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
            <BreadCumb title='Societe ' />
            <div class="wrap">

                <div class="container-fluid">

                    <div class="row">

                        <div class="col-lg-4 col-xlg-3 col-md-5">
                            <div class="card">
                                <div class="card-body profile-card">
                                    <center class="mt-4">
                                        <input
                                            type="file"
                                            accept="image/*"

                                            style={{ display: 'none' }}
                                            onChange={handleImageSelect}
                                            ref={fileInputRef}
                                        />
                                        <img
                                            src={selectedImage || logoPlaceholder}
                                            width="150"
                                            style={{ borderRadius: '20%' }}
                                        />

                                        <span className={iconStyle} style={{ color: "#097969" }} onClick={() => fileInputRef.current.click()}>
                                            <FaEdit />
                                        </span>



                                        {societe.map((societe) => (
                                            <div key={societe.id}>
                                                <h4 class="card-title mt-2">{societe.name}</h4>

                                            </div>
                                        ))}







                                    </center>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-8 col-xlg-9 col-md-7">
                            <div class="card">
                                <div class="card-body">
                                    <form class="form-horizontal form-material mx-2">
                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">Nom</label>
                                            <div class="col-md-12">
                                                <input type="text"
                                                    name='name'
                                                    placeholder={societe.map((societe) => societe.name).join(', ')}
                                                    value={input.name}
                                                    onChange={hundleInput}
                                                    class="form-control ps-0 form-control-line" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-md-12 mb-0">telephone</label>
                                            <div class="col-md-12">
                                                <input type="text"
                                                    name='phone'
                                                    placeholder={societe.map((societe) => societe.phone).join(', ')}
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
                                                    class="btn btn-success mx-auto mx-md-0 text-white"
                                                    onClick={hundleemplCreate}
                                                >
                                                    Modifier
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div >

        </>
    )
}

export default Societe