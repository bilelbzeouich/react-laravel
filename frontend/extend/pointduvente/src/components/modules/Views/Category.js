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

const Category = () => {
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
    const token = localStorage.getItem('token');
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value, token_id: token.id }))


  }
  const deleteCategory = (id) => {
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

  const hundleCategoryCreate = () => {
    axios.post(Constants.BASE_URL + '/categoryss', input).then(res => {
      console.log(res.data)
    
    }).catch(errors => {
      if (errors.response.status == 422) {
        setErrors(errors.response.data.errors)
      }
    }
    )
  }

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


  return (

    <>
      <BreadCumb title='Category ' />
      <div class="wrap">

        <div class="col-md-12">
          <div class="card">
            <div class="card-header">

              <Stack direction="horizontal" gap={3}>
                <div className="">
                  <Button type="primary" onClick={showDrawer} class="right_button" variant="outline-success" >
                    <FaPlus />
                  </Button></div>
                <div className=" border ms-auto">
                  <button type="button" class="btn btn-outline-danger"><FaFilePdf /></button>
                </div>
                <div className=" border">
                  <button type="button" class="btn btn-outline-success"><FaFileExcel /></button>
                </div>
              </Stack>

              <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div className='col-md-20'>
                  <div className='row justify-content-center'>
                    <label className='w-100'>
                      <p>Name</p>
                      <input
                        className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                        name='name'
                        type='texte'
                        value={input.name}
                        onChange={hundleInput}
                        placeholder='Entre Category Name'
                      />
                      <p class="text-danger"><small>{errors.name !== undefined ? errors.name[0] : null}</small></p>
                    </label>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='row justify-content-center'>
                    <div className='col-md-10'>
                      <div className='d-grid mt-4'>
                        <button onClick={hundleCategoryCreate} className='btn btn-outline-success'>Add Category</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer>

            </div>
            <div class="card-body">

              <div>


                <select class=" select-item selectWrapper" size={1} >
                  <option selected>10</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>


                <Form className="d-flex float-end">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className=""
                    aria-label="Search"
                  />

                </Form>
                <div class="card-body">
                  <table class="table">
                    <thead class="table-success">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Modifier</th>

                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            <button style={{ color: "red" }} type="submit" onClick={() => { deleteCategory(category.id) }} class="btn btn-outline-light"><Delete /></button>

                          </td>
                          <td>
                            <Link to={`/categories/${category.id}`}>
                              <a href="" onclick="return confirm('Etes-vous sûr ?')" class="btn btn-default btn-sm">
                                <i style={{ color: "	#ffcc00" }} ><EditRounded /></i>
                              </a></Link>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                  <nav aria-label="Page navigation example ">
                    <ul class="pagination float-end">
                      <li class="page-item"><a class="page-link link-dark" href="#">Previous</a></li>
                      <li class="page-item"><a class="page-link link-dark" href="#">1</a></li>
                      <li class="page-item"><a class="page-link link-dark" href="#">2</a></li>
                      <li class="page-item"><a class="page-link link-dark" href="#">3</a></li>
                      <li class="page-item"><a class="page-link link-dark" href="#">Next</a></li>
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