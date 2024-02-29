import React, { useState, useEffect } from 'react';
import BreadCumb from '../../../partials/BreadCumb';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { ArrowBack, BackHand, KeyboardReturnOutlined, ListAltOutlined } from '@mui/icons-material';

const AddClient = () => {
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const { clientId } = useParams();

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const validatePassword = () => {
        const { password, confirmPassword } = input;
        const validationErrors = {};

        // Password validation rules
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

        if (!strongRegex.test(password)) {
            validationErrors.password =
                'Le mot de passe doit être fort et respecter les critères de validation.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }

        setErrors(validationErrors);
    };

    const handleClientCreate = () => {
        axios
            .put(Constants.BASE_URL + `/clients/${clientId}`, input)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        axios
            .get(Constants.BASE_URL + `/clients/${clientId}`)
            .then((response) => {
                console.log(response.data);
                const categoryData = response.data;

                // Check if the response data is a valid category object
                if (typeof categoryData === 'object' && categoryData !== null) {
                    setClient(categoryData);
                } else {
                    setErrorMessage('Invalid category data');
                }
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    return (
        <>
            <BreadCumb title='Editer employé' />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Editer employé</h4>
                                <Link to="/employee/liste">
                                    <button type="button" className="right_button btn btn-outline-success">
                                        <KeyboardReturnOutlined />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>nom</p>
                                        <input
                                            className={errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name="name"
                                            type="text"
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder="bilel bzeouich"
                                        />
                                        <p className="text-danger">
                                            <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>e-mail</p>
                                        <input
                                            className={errors.email !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name="email"
                                            type="text"
                                            value={input.email}
                                            onChange={handleInput}
                                            placeholder="bilelbzeouich3@gmail.com"
                                        />
                                        <p className="text-danger">
                                            <small>{errors.email !== undefined ? errors.email[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100">
                                        <p>Mot de Passe</p>
                                        <input
                                            className={errors.password !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
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
                                                errors.confirmPassword !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'
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
                                                <button onClick={handleClientCreate} className="btn btn-outline-success">
                                                    Modifier
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

export default AddClient;
