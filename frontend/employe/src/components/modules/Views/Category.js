import React, { useEffect, useState } from 'react'
import BreadCumb from '../../partials/BreadCumb'
import '../../../assets/css/style.scss'
import axios from 'axios'
import Constants from '../../../Constants'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { FaFileExcel, FaFilePdf, FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Delete, EditRounded, PictureAsPdfOutlined, PlusOneOutlined } from '@mui/icons-material'
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  select

} from "react-bootstrap";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
const Category = () => {

  const GreenCircularProgress = withStyles({
    root: {
      color: '#00ff00',
    },
  })(CircularProgress);

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
  const hundleInput = (e) => {

    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))


  }
  const deleteCategory = (id) => {
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
          axios.delete(Constants.BASE_URL + `/categories/${id}`)
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
  const hundleCategoryCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(Constants.BASE_URL + '/category', input)
        .then(res => {
          console.log(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          if (errors?.response?.data?.errors == null) {
            Swal.fire({
              title: 'Success',
              text: 'categorie ajouté avec succes',
              icon: 'success',
              showConfirmButton: false
            });
          }
        })
        .catch(errors => {
          if (errors.response.status == 422) {
            setErrors(errors.response.data.errors);
          }
        });

    } catch (error) {
      // Handle any errors from the API request
      console.error('Error adding product:', error);
      Swal.fire('Error', 'quantité insuffisante', 'error');
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
  const filteredCategories = categories
    ? categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : '')
    )
    : [];

  // Get current rows based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

  // Delete category by id


  // Render rows
  const renderRows = currentRows.map((category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>
        <button
          style={{ color: "red" }}
          type="submit"
          onClick={() => deleteCategory(category.id)}
          className="btn btn-outline-light"
        >
          <Delete />
        </button>
      </td>
      <td>
        <Link to={`/categories/${category.id}`}>
          <a
            href=""

            className="btn btn-default btn-sm"
          >
            <i style={{ color: "#ffcc00" }}><EditRounded /></i>
          </a>
        </Link>
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

  return (

    <>
      <BreadCumb title='catégorie ' />
      <div class="wrap">

        <div class="col-md-12">
          <div class="card">
            <div class="card-header">

              <Stack direction="horizontal" gap={3}>


                <div class="  d-flex  justify-content-between align-items-center">

                  <Button type="primary" onClick={showDrawer} class="right_button" variant="outline-success" >
                    <FaPlus />
                  </Button></div>


              </Stack>

              <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div className='col-md-20'>
                  <div className='row justify-content-center'>
                    <label className="w-100">
                      <p>Name</p>
                      <input
                        className={
                          errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'
                        }
                        name="name"
                        type="text"
                        value={input.name}
                        onChange={hundleInput}
                        placeholder="Enter Category Name"
                      />
                      {errors.name && (
                        <p className="text-danger">
                          <small>{errors.name[0]}</small>
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='row justify-content-center'>
                    <div className='col-md-10'>

                      <div className='d-grid mt-4'>
                        <button onClick={hundleCategoryCreate} className='btn btn-outline-success'>Ajouter Category</button>
                      </div>

                    </div>
                  </div>
                </div>
              </Drawer>

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
                        <th scope="col">categorie</th>
                        <th scope="col">Supprimer</th>
                        <th scope="col">Modifier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderRows !== null ? (
                        renderRows
                      ) : (
                        <tr>
                          <td colSpan="10" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <GreenCircularProgress />
                          </td>
                        </tr>
                      )}
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

    </>
  )
}

export default Category