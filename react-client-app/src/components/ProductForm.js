import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

function ProductForm() {
  const [product, setProduct] = useState({ name: '', price: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ProductService.getProduct(id)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product', error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      ProductService.updateProduct(id, product)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating product', error);
        });
    } else {
      ProductService.addProduct(product)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding product', error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
        </label>
        </div>
        <div>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleInputChange} required />
        </label>
        </div>
        <div>
        <button type="submit">{id ? 'Update' : 'Add'} Product</button>
        </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ProductForm;
