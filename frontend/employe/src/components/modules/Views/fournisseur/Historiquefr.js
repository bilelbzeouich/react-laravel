import React, { useEffect, useRef, useState } from 'react'
import BreadCumb from '../../../partials/BreadCumb'

import axios from 'axios'
import Constants from '../../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, EditRounded, History, HistoryRounded, KeyboardReturnOutlined, PictureAsPdfOutlined, PlusOneOutlined, UpdateDisabledOutlined } from '@mui/icons-material'
import {
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
    select

} from "react-bootstrap";
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Logo from '../../../../assets/img/logo.png'
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

const Historiquefr = () => {
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;



    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [product, setProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { ref } = useParams();
    useEffect(() => {
        axios.get(Constants.BASE_URL + `/productfr/${ref}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
                setErrorMessage('');


            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);


    const deleteproduit = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    axios.delete(Constants.BASE_URL + `/produit/${id}`)
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
    const filteredCategories = product
        ? product.filter((client) =>
            client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.code_produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Get current rows based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

    // Delete category by id


    // Render rows
    const renderRows = currentRows.map((product) => (
        <tr key={product.id}>
            <td>
                <img src={"/" + product.image} alt={product.name} className="produit" />
            </td>
            <td>{product.nom}</td>
            <td>{product.category.name}</td>

            <td>{product.qte}</td>
            <td>{product.prix}</td>
            <td>{product.code_produit}</td>
            <td>{product.date_expiration}</td>









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
            <BreadCumb title='Reception ' />
            <div class="wrap">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <Stack direction="horizontal" gap={3}>


                                <Link to="/fournisseur/liste">
                                    <Button type="primary" class="right_button" variant="outline-success" >
                                        <KeyboardReturnOutlined />
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
                                                <th scope="col">Image</th>
                                                <th scope="col">Nom Produit</th>
                                                <th scope="col">Category</th>



                                                <th scope="col">quantite</th>
                                                <th scope="col">prix</th>
                                                <th scope="col">Code Produit</th>
                                                <th scope="col">Date expiration</th>



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
                        <th scope="col">Image</th>
                        <th scope="col">Nom Produit</th>
                        <th scope="col">Category</th>



                        <th scope="col">quantite</th>
                        <th scope="col">prix</th>
                        <th scope="col">Code Produit</th>
                        <th scope="col">Date expiration</th>



                    </tr>
                </thead>
                <tbody>
                    {product.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img src={"/" + product.image} alt={product.name} className="produit"
                                    style={{ width: '20%', borderRadius: '10px' }} />

                            </td>
                            <td>{product.nom}</td>
                            <td>{product.category.name}</td>

                            <td>{product.qte}</td>
                            <td>{product.prix}</td>
                            <td>{product.code_produit}</td>
                            <td>{product.date_expiration}</td>









                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Historiquefr