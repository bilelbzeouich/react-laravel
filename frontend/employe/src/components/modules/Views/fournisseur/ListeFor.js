import React, { useEffect, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaHandPaper, FaPlus, FaPlusSquare } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, Description, EditRounded, History, HistoryRounded, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import Logo from '../../../../assets/img/logo.png'
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
const ListeFor = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;

    const deleteclient = (id) => {
        Swal.fire({
            title: 'Es-tu sûr?',
            text: "Vous allez le supprimer",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le !'
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    axios.delete(Constants.BASE_URL + `/for/${id}`)
                        .then(response => {
                            console.log(response.data.message);
                            window.location.reload()
                            // Reload the category list or perform other actions as needed
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        })
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const hundleInput = (e) => {
        if (e.target.name == "name") {
            let Slug = e.target.value
            Slug = Slug.toLowerCase()
            Slug = Slug.replaceAll(' ', '-')
            setInput(prevState => ({ ...prevState, Slug: Slug }))

        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


    }

    const hundleCategoryCreate = () => {
        axios.post(Constants.BASE_URL + '/category', input).then(res => {
            console.log(res.data)
        }).catch(errors => {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
        )

    }
    const [fornisseur, setFornisseur] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    const [searchTerm, setSearchTerm] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleRowsPerPageChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setRowsPerPage(selectedValue);
    };
    // Sample data for categories


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter categories based on search term
    const filteredCategories = fornisseur
        ? fornisseur.filter((client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

            client.ribbancaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.telephone.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Get current rows based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

    // Delete category by id


    // Render rows
    const renderRows = currentRows.map((fornisseur) => (
        <tr key={fornisseur.id}>
            <td>{fornisseur.id}</td>
            <td>{fornisseur.name}</td>
            <td>{fornisseur.localisation}</td>
            <td>{fornisseur.telephone}</td>
            <td>{fornisseur.mail}</td>
            <td>{fornisseur.ribbancaire}</td>

            <td>      <Link to={`/hitorique/${fornisseur.id}`}>
                <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                    <i style={{ color: "	#ffcc00" }} ><HistoryRounded /></i>
                </a>
            </Link>
            </td>
            <td>
                <Link to={`/FornisseurEdit/${fornisseur.id}`}>
                    <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                        <i style={{ color: "	#ffcc00" }} ><EditRounded /></i>
                    </a></Link>
            </td>
            <td>
                <button style={{ color: "red" }} type="submit" className="btn btn-outline-light" onClick={() => deleteclient(fornisseur.id)}>
                    <Delete />
                </button>
            </td>
            <td>
                <Link to={`/reception/add`}>
                    <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                        <i style={{ color: "	green" }} ><Description /></i>
                    </a></Link>
            </td>

        </tr>
    ));


    // Render pagination links
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCategories.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPaginationLinks = pageNumbers.map((number) => (
        <li key={number} className="page-item">
            <a
                className="page-link link-dark"
                href="#"
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </a>
        </li>
    ));
    const tableRef = useRef();
    const printPdf = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`@media print {
          #logo {
            display: block;
            text-align: center;
            margin-top: 20px;
          }
          #pdfTable {
            margin: 0 auto;
            width: 100%; /* Adjust the width value as needed */
          }
          #pdfTable th,
          #pdfTable td {
            border: 1px solid black; /* Add the border style for table cells */
        
          }
        }`);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');

        // Logo
        printWindow.document.write(`<div id="logo"><img src="${Logo}" alt="Logo" width="100" /></div>`);

        // Table
        printWindow.document.write('<table id="pdfTable">');
        printWindow.document.write(tableRef.current.innerHTML);
        printWindow.document.write('</table>');

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };
    const handleDownloadExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Get the table reference and table rows
        const table = tableRef.current;
        const rows = table.getElementsByTagName('tr');

        // Add table headers to the worksheet
        const headers = Array.from(rows[0].getElementsByTagName('th')).map(header => header.textContent);
        worksheet.addRow(headers);

        // Add table rows to the worksheet
        for (let i = 1; i < rows.length; i++) {
            const cells = Array.from(rows[i].getElementsByTagName('td')).map(cell => cell.textContent);
            worksheet.addRow(cells);
        }

        // Generate and save the Excel file
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'table.xlsx');
        });
    };
    return (

        <>
            <BreadCumb title='fournisseur ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <Link to="/fournisseur/add">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <FaPlus />
                                    </Button>
                                </Link>
                                <div className=" border ms-auto">
                                    <button type="button" class="btn btn-outline-danger" onClick={printPdf}><FaFilePdf /></button>
                                </div>
                                <div className=" border">
                                    <button type="button" class="btn btn-outline-success" onClick={handleDownloadExcel}><FaFileExcel /></button>
                                </div>
                            </Stack>


                        </div>

                        <div className="card-body">
                            <div>
                                <select
                                    className="select-item selectWrapper"
                                    size={1}
                                    value={rowsPerPage} // Set the selected value based on the rowsPerPage state
                                    onChange={handleRowsPerPageChange} // Call the handleRowsPerPageChange function on change
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>

                                <Form className="d-flex float-end">
                                    <Form.Control
                                        type="search"
                                        placeholder="recherche"
                                        className=""
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </Form>

                                <div className="card-body">
                                    <table className="table">
                                        <thead className="table-success">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">nom</th>
                                                <th scope="col">localisation</th>
                                                <th scope="col">telephone</th>
                                                <th scope="col">mail</th>
                                                <th scope="col">rib bancaire</th>
                                                <th scope="col">historique</th>
                                                <th scope="col">Modifier</th>
                                                <th scope="col">Supprimer</th>
                                                <th scope="col">ajouter Reception</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderRows}
                                        </tbody>
                                    </table>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination float-end">
                                            <li className="page-item">
                                                <a
                                                    className="page-link link-dark"
                                                    href="#"
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    Precedent

                                                </a>
                                            </li>
                                            {renderPaginationLinks}
                                            <li className="page-item">
                                                <a
                                                    className="page-link link-dark"
                                                    href="#"
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                                    disabled={currentPage === pageNumbers.length}
                                                >
                                                    Suivant
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <table id="pdfTable" ref={tableRef} style={{ display: 'none', border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                    <tr>

                        <th scope="col">#</th>
                        <th scope="col">nom</th>
                        <th scope="col">localisation</th>
                        <th scope="col">telephone</th>
                        <th scope="col">mail</th>
                        <th scope="col">rib bancaire</th>
                    </tr>
                </thead>
                <tbody>
                    {fornisseur.map(fornisseur => (
                        <tr key={fornisseur.id}>
                            <td>{fornisseur.id}</td>
                            <td>{fornisseur.name}</td>
                            <td>{fornisseur.localisation}</td>
                            <td>{fornisseur.telephone}</td>
                            <td>{fornisseur.mail}</td>
                            <td>{fornisseur.ribbancaire}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListeFor