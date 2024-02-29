import React from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { Gear, AddOutline, Dashboard, TableColumn, UserBadge, Member, Location } from '@rsuite/icons';
import { Description, Equalizer, Inventory, LocalShippingOutlined, LocationCity, LocationCityRounded, ShoppingCart, SocialDistance, StoreRounded } from '@mui/icons-material';
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
                        <Link class="nav-link" to="/Category">
                            <div class="sb-nav-link-icon"><TableColumn /></div>
                            Category
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
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#tollapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><FaUser /></div>
                            Fournisseur
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="tollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="fournisseur/liste">Lite des Fournisseurs </Link>
                                <Link class="nav-link" to="fournisseur/add">Ajout Fournisseur</Link>
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

                        <Link class="nav-link" to="/EtatStock">
                            <div class="sb-nav-link-icon"><FaBox /></div>
                            Etat De Stock
                        </Link>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#mollapseLayouts" aria-expanded="false" aria-controls="tollapseLayouts">
                            <div class="sb-nav-link-icon"><Description /></div>
                            Expedition
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="mollapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="expedition/liste">Lite des Expeditions </Link>
                                <Link class="nav-link" to="expedition/Add">Ajout Expedition</Link>
                            </nav>
                        </div>

                        <Link class="nav-link" to="/Rapport">
                            <div class="sb-nav-link-icon"><Equalizer /></div>
                            Rapport
                        </Link>



                    </div>
                </div >
                <div class="sb-sidenav-footer">
                    <div class="small">Connecté en tant que :</div>
                    employé
                </div>
            </nav >
        </div >
    )
}

export default SideBar