import React, { Component } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Master from '../layout/Master'
import Dashboard from '../modules/Dashboard'
import Category from '../modules/Views/Category'
import Users from '../modules/Views/Users'
import Emplacement from '../modules/Views/Emplacement'
import Addrecep from '../modules/Views/reception/AddRecep'
import ListeRecep from '../modules/Views/reception/ListeRecep'
import Addfor from '../modules/Views/fournisseur/Addfor'
import ListeFor from '../modules/Views/fournisseur/ListeFor'
import AddClient from '../modules/Views/clients/AddClient'
import ListeClients from '../modules/Views/clients/ListeClients'
import ListExp from '../modules/Views/expedition/ListExp'
import AddExp from '../modules/Views/expedition/AddExp'
import Rapport from '../modules/Views/Rapport'
import Societe from '../modules/Views/Societe'
import AddCategory from '../modules/Views/AddCategory'
import EtatStock from '../modules/Views/EtatStock'
import QRCodeGenerator from '../modules/extension/QRGenerator'
import EditCategory from '../modules/Views/edit/EditCategory'
import EmplacementEdit from '../modules/Views/edit/EmplacementEdit'
import ClientEdit from '../modules/Views/edit/ClientEdit'
import FornisseurEdit from '../modules/Views/edit/FornisseurEdit'
import ProductEdit from '../modules/Views/edit/ProductEdit'
import EditExpedition from '../modules/Views/edit/EditExpedition'
import Addpv from '../modules/Views/pv/Addpv'
import Listepv from '../modules/Views/pv/Listepv'
import Commande from '../modules/Views/pv/Commande'
import CommandeView from '../modules/Views/pv/CommandeView'
import Addemploye from '../modules/Views/employee/Addemploye'
import Employelist from '../modules/Views/employee/Employelist'






const ProjectRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <Master />,
            children: [
                {
                    path: '/',
                    element: <Dashboard />
                },
                {
                    path: '/Category',
                    element: <Category />
                },
                {
                    path: '/utilisateurs',
                    element: <Users />
                },
                {
                    path: '/Emplacement',
                    element: <Emplacement />
                },
                {
                    path: 'reception/add',
                    element: <Addrecep />
                },
                {
                    path: 'reception/liste',
                    element: <ListeRecep />
                },
                {
                    path: 'fournisseur/add',
                    element: <Addfor />
                },
                {
                    path: 'fournisseur/liste',
                    element: <ListeFor />
                },
                {
                    path: 'Clients/add',
                    element: <AddClient />
                },
                {
                    path: 'Clients/liste',
                    element: <ListeClients />
                },

                {
                    path: 'expedition/liste',
                    element: <ListExp />
                },
                {
                    path: 'expedition/Add',
                    element: <AddExp />
                },
                {
                    path: 'Rapport',
                    element: <Rapport />
                },
                {
                    path: 'Societe',
                    element: <Societe />
                },
                {
                    path: 'addcategory',
                    element: <AddCategory />
                },
                {
                    path: 'EtatStock',
                    element: <EtatStock />
                },
                {
                    path: 'QR',
                    element: <QRCodeGenerator />
                },
                {
                    path: "/categories/:categoryId",
                    element: <EditCategory />
                },
                {
                    path: "/EmplacementEdit/:emplacementsId",
                    element: <EmplacementEdit />
                },
                {
                    path: "/ClientEdit/:clientId",
                    element: <ClientEdit />
                },

                {
                    path: "/FornisseurEdit/:fornisseurId",
                    element: <FornisseurEdit />
                },
                {
                    path: "/ProductEdit/:productId",
                    element: <ProductEdit />
                },

                {
                    path: "/EditExpedition/:livraisonId",
                    element: <EditExpedition />
                },
                {
                    path: "/pv/addpv",
                    element: <Addpv />
                },
                {
                    path: "/pv/Listepv",
                    element: <Listepv />
                },
                {
                    path: "/commande",
                    element: <Commande />
                },
                {
                    path: "/view/commande/:name",
                    element: <CommandeView />
                },
                {
                    path: "/employee/Listeemployee",
                    element: <Addemploye />
                },
                {
                    path: "/employee/liste",
                    element: <Employelist />
                },


            ]
        }
    ]
)



export default ProjectRouter;