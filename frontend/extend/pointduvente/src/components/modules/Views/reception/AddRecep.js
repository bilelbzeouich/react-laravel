import React, { useEffect, useState } from 'react';
import BreadCumb from '../../../partials/BreadCumb';
import { Await, Link } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../../../Constants';
import { List, Input } from 'rsuite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import { Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart } from '@mui/icons-material';
import { CardBody } from 'shards-react';
import Swal from 'sweetalert2';

const AddRecep = () => {
    const [product, setProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get(Constants.BASE_URL + '/produit')
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        const filteredData = product.filter((item) => {
            const nameMatch = item.nom.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || descriptionMatch;
        });
        setFilteredProduct(filteredData);
    }, [product, searchTerm]);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const [adresse, setAdresse] = useState('');
    const [product_title, setProduct_title] = useState('');
    const [product_id, setProduct_id] = useState(null);
    const [selectedemplacement, setSelectedemplacement] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantities, setQuantities] = useState(Array(filteredProduct.length).fill(0));

    const hundleaddpanier = (nom, prix, image, id, index) => {


        const pv_id = localStorage.getItem('id');

        const phone = localStorage.getItem('phone');

        const email = localStorage.getItem('email');

        try {





            const formData = new FormData();
            formData.append('name', nom);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', 'point du vente');
            formData.append('product_title', nom);
            formData.append('price', prix);
            formData.append('quantity', quantities[index]);
            formData.append('image', image);
            formData.append('pv_id', pv_id);
            formData.append('product_id', id);

            const response = axios.post(Constants.BASE_URL + '/caretpv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });




            // Check if the response contains an error message

        } catch (error) {
            // Handle any errors from the API request
            console.error('Error adding product:', error);
            Swal.fire('Error', 'ERROR', 'error');
        }
    }

    return (
        <>
            <form encType="multipart/form-data">
                <BreadCumb title="Ajouter Fornisseur" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>Ajouter Produit</h4>
                                    <Link to="/Panier">
                                        <Button type="primary" className="right_button" variant="outline-success">
                                            <ShoppingCart />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <Form className="d-flex justify-content-end">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    style={{ width: '20%', borderRadius: '5px', margin: '10px' }}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button
                                    type="button"
                                    style={{
                                        width: '5%',
                                        borderRadius: '5px',
                                        margin: '10px',
                                        background: 'transparent',
                                        border: 'none',
                                    }}
                                >
                                    <SearchIcon />
                                </button>
                            </Form>
                            <div className="card-body" style={{ display: 'flex', gap: '20px' }}>
                                {filteredProduct.map((product, index) => (
                                    <Card sx={{ maxWidth: 300 }} key={product.id}>
                                        <CardMedia component="img" alt="green iguana" height="250" image={'/' + product.image} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.nom}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.prix}TND
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <input
                                                type="number"
                                                placeholder="Qte"
                                                style={{ width: '20%', borderRadius: '5px' }}
                                                value={quantities[index]}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value > 0) {
                                                        const newQuantities = [...quantities];
                                                        newQuantities[index] = value;
                                                        setQuantities(newQuantities);
                                                    } else {
                                                        // Display an error message or handle the error condition
                                                        console.error('Quantity must be greater than zero');
                                                    }
                                                }}
                                            />
                                            <Button onClick={() => hundleaddpanier(product.nom, product.prix, product.image, product.id, index)} variant="outline-success">
                                                ADD
                                            </Button>
                                        </CardActions>
                                    </Card>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>

            </form >

        </>
    );
};

export default AddRecep;
