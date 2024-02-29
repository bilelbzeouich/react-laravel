import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, EditRounded, ListAltOutlined } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import { ListItem } from '@mui/material';
import { List } from 'rsuite';
import Swal from 'sweetalert2';
import { error } from 'jquery';

const AddRecep = () => {
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedfornisseur, setSelectedFornisseur] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedemplacement, setSelectedemplacement] = useState(null);
    const [prix, setPrix] = useState(null);




    const [randomCode, setRandomCode] = useState('');
    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        setRandomCode(code);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/category')
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    const [fornisseur, setFornisseur] = useState([]);

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/fournissuer')
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

    const [emplacements, setEmplacements] = useState([]);


    useEffect(() => {
        axios.get(Constants.BASE_URL + '/emplacement')
            .then(response => {
                console.log(response.data);
                setEmplacements(response.data);
                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();


        try {

            const formData = new FormData();
            formData.append('nom', name);
            formData.append('category_id', selectedCategory);
            formData.append('image', image);
            formData.append('qte', quantity);
            formData.append('emplacement_id', selectedemplacement);
            formData.append('fornissuers_id', selectedfornisseur);
            formData.append('code_produit', randomCode);
            formData.append('description', description);
            formData.append('date_expiration', date);
            formData.append('prix', prix);


            const response = await axios.post(Constants.BASE_URL + '/produit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setName('');
            setSelectedCategory('');
            setSelectedFornisseur('');
            setSelectedemplacement('');
            setDate('');
            setImage(null);
            setQuantity('');
            setDescription('');
            setPrix('')

            // Check if the response contains an error message
            if (response.data.message === 'Insufficient capacity') {
                // Display Swal error message
                Swal.fire({
                    icon: 'error',
                    title: 'Insufficient Capacity',
                    text: 'The emplacement does not have enough capacity.',
                });
            } else {
                // Product added successfully
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                Swal.fire({
                    title: 'Success',
                    text: 'produit ajouté avec succès',
                    icon: 'success',
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding product:', error);
            Swal.fire('Error', 'ERROR', 'error');
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                <BreadCumb title='Ajouter reception' />
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">

                            <div class="card-header">

                                <div class="  d-flex  justify-content-between align-items-center">
                                    <h4>Ajouter Produit</h4>
                                    <Link to="/reception/liste">
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
                                            <p>Nom Produit</p>
                                            <input
                                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name='name'
                                                type='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder='name'
                                            />
                                            <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='w-100'>
                                            <p>categorie</p>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="">Select category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>emplacement</p>
                                        <label className='w-100 '>

                                            <select class="form-select" aria-label="Default select example"
                                                value={selectedemplacement}
                                                onChange={(e) => setSelectedemplacement(e.target.value)}>
                                                <option selected>emplacement</option>
                                                {emplacements.map((emplacements) => (
                                                    <option key={emplacements.id} value={emplacements.id}>{emplacements.name}</option>
                                                ))}
                                            </select>
                                        </label>

                                    </div>
                                    <div className='col-md-6'>
                                        <p>Fornisseur</p>

                                        <label className='w-100 '>

                                            <select class="form-select" aria-label="Default select example"
                                                value={selectedfornisseur}
                                                onChange={(e) => setSelectedFornisseur(e.target.value)}>
                                                <option selected>Fornisseur</option>

                                                {fornisseur.map((fornisseur) => (
                                                    <option key={fornisseur.id} value={fornisseur.id}>{fornisseur.name}</option>
                                                ))}
                                            </select>
                                        </label>

                                    </div>


                                    <div className='col-md-6'>
                                        <p>Quantite</p>
                                        <label className='w-100 '>

                                            <input
                                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name='quantity'
                                                type='number'
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                placeholder='Qte'
                                            />
                                            <p class="text-danger"><small>{errors.Qte !== undefined ? errors.Qte[0] : null}</small></p>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Date expiration</p>
                                        <label className='w-100'>

                                            <section class="container">

                                                <form class="row">


                                                    <div class="input-group " id="datepicker">
                                                        <input type="date" class="form-control"
                                                            name="date"
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)} />
                                                        <span class="input-group-append">

                                                        </span>
                                                    </div>

                                                </form>
                                            </section>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='w-100'>
                                            <p>Prix</p>
                                            <input
                                                className={errors.prix != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name='prix'
                                                type='texte'
                                                value={prix}
                                                onChange={(e) => setPrix(e.target.value)}
                                                placeholder='prix'
                                            />
                                            <p class="text-danger"><small>{errors.prix !== undefined ? errors.prix[0] : null}</small></p>
                                        </label>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>Description</p>
                                        <label className='w-100 '>

                                            <textarea
                                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                name='description'
                                                type='textarea'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder='Description'
                                            />
                                            <p class="text-danger"><small>{errors.Description !== undefined ? errors.Description[0] : null}</small></p>
                                        </label>
                                    </div>

                                    <div className='col-md-6'>
                                        <p>Image Produit</p>
                                        <label className='w-100 '>

                                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                                            {selectedImage && <img src={selectedImage} class="image_add" alt="Preview" />}
                                        </label>
                                    </div>


                                    <div className='col-md-12'>
                                        <div className='row justify-content-center'>
                                            <div className='col-md-4'>
                                                <div className='d-grid mt-4'>
                                                    <button type="submit" onClick={generateRandomCode} className='btn btn-outline-success'>Ajouter</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </form>
        </>
    );
}

export default AddRecep