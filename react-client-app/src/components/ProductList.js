import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    ProductService.getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  };

  const handleDelete = (id) => {
    ProductService.deleteProduct(id)
      .then(() => {
        fetchProducts(); // Refresh the product list after deletion
      })
      .catch((error) => {
        console.error('Error deleting product', error);
      });
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add" style={{ marginTop: '10px', display: 'inline-block' }}>Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <Link to={`/edit/${product.id}`} style={{ marginLeft: '10px', backgroundColor: 'blue', color: 'white' }}>Edit</Link>
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete</button>
          </li>
        ))}
      </ul>
     
    </div>
  );
}

export default ProductList;
