import $ from 'jquery';
import logo from '../../assets/img/logo.png'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Constants';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { FaBell, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Nav = () => {
    const navigate = useNavigate();
    const handlelogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(Constants.BASE_URL + '/logout').then(res => {
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.removeItem('phone')
                    localStorage.removeItem('token')
                    navigate('/');

                    // Reload the page
                    window.location.reload();
                }).catch(errors => {

                }

                )
            }
        })

    }

    const handlesidebar = () => {
        $('body').toggleClass(
            'sb-sidenav-toggled'
        )
    }
    function notificationsLabel(count) {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 99) {
            return 'more than 99 notifications';
        }
        return `${count} notifications`;
    }
    const [product, setproduit] = useState([]);
    const [date, setDate] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [productsWithQuantityLessThan10, setProductsWithQuantityLessThan10] = useState([]);
    useEffect(() => {
        axios.get(Constants.BASE_URL + '/notif')
            .then(response => {
                console.log(response.data);
                setproduit(response.data);



            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);
    useEffect(() => {
        axios.get(Constants.BASE_URL + '/notifdate')
            .then(response => {
                console.log(response.data);
                setDate(response.data);



            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    return (
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-success ">


            <a class="navbar-brand ps-3" href="/">
                <img src={logo} alt='logo' className='$thumbnail-padding' width="87" />
            </a>

            <button onClick={handlesidebar} class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>


            <ul class="navbar-nav ms-auto me-3 me-lg-4 align-items-center">


                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <FaUser />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li className="dropdown-item">Admin</li>
                        <li>
                            <a className="dropdown-item" href="/Societe">
                                Profil
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button onClick={handlelogout} className="dropdown-item">
                                Logout
                            </button>
                        </li>
                    </ul>
                </li>



            </ul>

        </nav >
    )
}

export default Nav