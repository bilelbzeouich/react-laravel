import React from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { Gear, AddOutline, Dashboard, TableColumn, UserBadge, Member, Location, UserInfo } from '@rsuite/icons';
import { AccountCircleOutlined, Description, Equalizer, Inventory, LocationCity, LocationCityRounded, ShoppingCart, SocialDistance } from '@mui/icons-material';
import { Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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


                        <Link class="nav-link" to="/Emplacement">
                            <div class="sb-nav-link-icon"><LocationCity /></div>
                            Emplacement
                        </Link>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><FaUser /></div>
                            Client
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="Clients/liste">Lite des Clients</Link>
                                <Link class="nav-link" to="Clients/add">Ajout Client</Link>
                            </nav>
                        </div>


                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#yollapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><ShoppingCart /></div>
                            Reception
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="yollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="reception/liste">Lite des Receptions </Link>
                                <Link class="nav-link" to="reception/add">Ajout Reception</Link>
                            </nav>
                        </div>
                        <Link class="nav-link" to="/EtatStock">
                            <div class="sb-nav-link-icon"><FaBox /></div>
                            Etat De Stock
                        </Link>
                        <Link class="nav-link" to="/commande">
                            <div class="sb-nav-link-icon"><LocalShippingIcon /></div>
                            commande
                        </Link>

                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#mollapseLayouts" aria-expanded="false" aria-controls="tollapseLayouts">
                            <div class="sb-nav-link-icon"><Description /></div>
                            Facturation
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="mollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="expedition/liste">Lite des Expeditions </Link>
                                <Link class="nav-link" to="expedition/Add">Ajout Expedition</Link>
                            </nav>
                        </div>
                        <Link class="nav-link" to="/Societe">
                            <div class="sb-nav-link-icon"><AccountCircleOutlined /></div>
                            Profil
                        </Link>
                        <Link class="nav-link" to="/Rapport">
                            <div class="sb-nav-link-icon"><Equalizer /></div>
                            Rapport
                        </Link>



                    </div>
                </div >

            </nav >
        </div >
    )
}

export default SideBar