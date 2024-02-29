import React from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { Gear, AddOutline, Dashboard, TableColumn, UserBadge, Member, Location } from '@rsuite/icons';
import { AccountCircleOutlined, Description, Equalizer, Inventory, LocalShippingOutlined, LocationCity, LocationCityRounded, ShoppingCart, SocialDistance, StoreRounded } from '@mui/icons-material';
import { Box } from '@mui/material';


const SideBar = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading"></div>
                        <Link class="nav-link" to="/">
                            <div class="sb-nav-link-icon"><Dashboard /></div>
                            Dashboard
                        </Link>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pvollapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><AccountCircleOutlined /></div>
                            employés
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="pvollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="/employee/liste">Liste des employees </Link>
                                <Link class="nav-link" to="/employee/Listeemployee">Ajout employee</Link>
                            </nav>
                        </div>






                        {/*
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pvollapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><StoreRounded /></div>
                            Point De Vente
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>

                        <div class="collapse" id="pvollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="/pv/Listepv">Liste des Pvs </Link>
                                <Link class="nav-link" to="/pv/addpv">Ajout PV</Link>
                                <Link class="nav-link" to="/commande">
                                    <div class="sb-nav-link-icon"><LocalShippingOutlined /></div>
                                    commande pv
                                </Link>
                            </nav>
                        </div>   */}


                        <Link class="nav-link" to="/Societe">
                            <div class="sb-nav-link-icon"><LocationCityRounded /></div>
                            Societe
                        </Link>



                    </div>
                </div >

            </nav >
        </div >
    )
}

export default SideBar