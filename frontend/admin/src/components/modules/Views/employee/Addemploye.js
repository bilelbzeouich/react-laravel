import React, { useState } from 'react';
import BreadCumb from '../../../partials/BreadCumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, ListAltOutlined } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const AddEmploye = () => {
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const validatePassword = () => {
        const { password, confirmPassword } = input;
        const validationErrors = {};

        // Password validation rules
        const strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
        );

        if (!strongRegex.test(password)) {
            validationErrors.password =
                'Le mot de passe doit être fort et respecter les critères de validation.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }

        setErrors(validationErrors);
    };

    const handleCategoryCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(Constants.BASE_URL + '/pv', input);
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            if (!response.data?.errors) {
                Swal.fire({
                    title: 'Success',
                    text: 'employé ajouté avec succès',
                    icon: 'success',
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding employee:', error);
            Swal.fire('Error', 'quantité insuffisante', 'error');
        }
    };

    return (
        <>
            <BreadCumb title="Ajouter employé" />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Ajouter employé</h4>
                                <Link to="/employee/liste">
                                    <Button type="primary" className="right_button" variant="outline-success">
                                        <ListAltOutlined />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>nom</p>
                                        <input
                                            className={
                                                errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'
                                            }
                                            name="name"
                                            type="text"
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder="Entre Fournisseur nom"
                                        />
                                        {errors.name && (
                                            <p className="text-danger">
                                                <small>{errors.name[0]}</small>
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>e-mail</p>
                                        <input
                                            className={
                                                errors.mail !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'
                                            }
                                            name="mail"
                                            type="text"
                                            value={input.mail}
                                            onChange={handleInput}
                                            placeholder="e-mail"
                                        />
                                        {errors.mail && (
                                            <p className="text-danger">
                                                <small>{errors.mail[0]}</small>
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>Mot de Passe</p>
                                        <input
                                            className={
                                                errors.password !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'
                                            }
                                            name="password"
                                            type="password"
                                            value={input.password}
                                            onChange={handleInput}
                                            onBlur={validatePassword} // Trigger password validation on blur
                                            placeholder="Entre mot de passe"
                                        />
                                        {errors.password && (
                                            <p className="text-danger">
                                                <small>{errors.password}</small>
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>Vérifier mot de passe</p>
                                        <input
                                            className={
                                                errors.confirmPassword !== undefined
                                                    ? 'form-control mt-2 is-invalid'
                                                    : 'form-control mt-2'
                                            }
                                            name="confirmPassword"
                                            type="password"
                                            value={input.confirmPassword}
                                            onChange={handleInput}
                                            onBlur={validatePassword} // Trigger password validation on blur
                                            placeholder="Vérifier mot de passe"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-danger">
                                                <small>{errors.confirmPassword}</small>
                                            </p>
                                        )}
                                    </label>
                                </div>
                                {/* Display a message indicating if the password meets the requirements */}
                                {input.password && !errors.password && (
                                    <div className="col-md-12">
                                        <p className="text-success">
                                            <strong>Le mot de passe est fort.</strong>
                                        </p>
                                    </div>
                                )}
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button onClick={handleCategoryCreate} className="btn btn-outline-success">
                                                    Ajouter
                                                </button>
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
};

export default AddEmploye;
