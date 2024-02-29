import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, EditRounded, KeyboardReturnRounded, ListAltOutlined } from '@mui/icons-material';
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
    const { productId } = useParams();
    const [products, setProducts] = useState(null);
    const [Productcategory, setProductcategory] = useState(null);
    const [Productemplacement, setProductemplacement] = useState(null);
    const [productfornissuer, setproductfornissuer] = useState(null);






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

    useEffect(() => {

        axios.get(Constants.BASE_URL + `/products/${productId}`)
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    useEffect(() => {

        axios.get(Constants.BASE_URL + `/product/${productId}`)
            .then(response => {
                console.log(response.data);
                setProductcategory(response.data.categoryName);
                setProductemplacement(response.data.emplacementName);
                setproductfornissuer(response.data.fornissuerName);

                setErrorMessage('');

            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);


    const hundleInput = (e) => {

        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }
    const hundleCategoryCreate = async (e) => {
        e.preventDefault();


        try {

            axios.put(Constants.BASE_URL + `/produitup/${productId}`, input).then(res => {
                console.log(res.data)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                if (errors?.response?.data?.errors == null) {
                    Swal.fire({
                        title: 'Success',
                        text: 'produit édité avec succès',
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
                                <h4>Editer Produit</h4>
                                <Link to="/reception/liste">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <KeyboardReturnRounded />
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
                                            type='texte'
                                            value={input.name}
                                            onChange={hundleInput}

                                            placeholder={products ? products.nom : 'nom Produit'}
                                        />
                                        <p class="text-danger"><small>{errors.Cproduit !== undefined ? errors.Cproduit[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <label className='w-100'>
                                        <p>categorie</p>
                                        <select
                                            name='category_id'
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={input.selectedCategory}
                                            onChange={hundleInput}
                                        >
                                            <option value={Productcategory ? Productcategory.name : 'nom category'}>{Productcategory ? Productcategory.name : 'nom Produit'}</option>
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
                                            name='emplacment_id'
                                            value={input.selectedemplacement}
                                            onChange={hundleInput}>
                                            <option value={Productemplacement ? Productemplacement.name : 'nom category'}>{Productemplacement ? Productemplacement.name : 'nom Produit'}</option>

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
                                            name='fornisseur_id'
                                            value={input.selectedfornisseur}
                                            onChange={hundleInput}
                                        >
                                            <option value={productfornissuer ? productfornissuer.name : 'nom category'}>{productfornissuer ? productfornissuer.name : 'nom Produit'}</option>

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
                                            value={input.quantity}
                                            onChange={hundleInput}
                                            placeholder={products ? products.qte : 'Qte'}
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
                                                        placeholder="Select a date"


                                                        defaultValue={products ? products.date_expiration : ""}
                                                        onChange={hundleInput} />
                                                    <span class="input-group-append">

                                                    </span>
                                                </div>

                                            </form>
                                        </section>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <p>Description</p>
                                    <label className='w-100 '>

                                        <textarea
                                            className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name='description'
                                            type='textarea'
                                            value={input.description}
                                            onChange={hundleInput}
                                            placeholder={products ? products.description : 'Description'}
                                        />
                                        <p class="text-danger"><small>{errors.Description !== undefined ? errors.Description[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className='col-md-6'>
                                    <p>Image Produit</p>
                                    <label className='w-100 '>

                                        <input type="file" name='image' value={input.image} accept="image/*" onChange={hundleInput} />

                                        {products ? (
                                            <img src={"/" + products.image} alt={products.name} className="produit" />
                                        ) : (
                                            <span className="image-placeholder">Image</span>
                                        )}
                                    </label>
                                </div>


                                <div className='col-md-12'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4'>
                                            <div className='d-grid mt-4'>
                                                <button type="button" onClick={hundleCategoryCreate} className='btn btn-outline-success'>Editer</button>
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

export default AddRecep