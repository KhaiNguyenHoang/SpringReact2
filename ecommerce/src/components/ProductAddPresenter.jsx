import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {productDetail, errorDetail, statusDetail, resetProductAddStatus, addProduct } from '../features/productAddSlice';

const ProductAddPresenter = () => {
  const dispatch = useDispatch();
  const status = useSelector(statusDetail);
  const error = useSelector(errorDetail);
  const product = useSelector(productDetail);

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    specialPrice: '',
    quantityInStock: '',
    status: 'Available', // Default status
    imageUrl: '',
    isActive: true, // Default active
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert numeric fields to numbers
    const productToSubmit = {
      ...formData,
      price: parseFloat(formData.price),
      specialPrice: parseFloat(formData.specialPrice),
      quantityInStock: parseInt(formData.quantityInStock, 10),
    };
    dispatch(addProduct(productToSubmit));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Product added successfully!');
      setFormData({ // Reset form
        productName: '',
        description: '',
        category: '',
        price: '',
        specialPrice: '',
        quantityInStock: '',
        status: 'Available',
        imageUrl: '',
        active: true,
      });
      dispatch(resetProductAddStatus()); // Reset slice status
    } else if (status === 'failed') {
      alert(`Failed to add product: ${error}`);
    }
  }, [status, error, dispatch]);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="productName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="specialPrice" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Special Price:</label>
          <input
            type="number"
            id="specialPrice"
            name="specialPrice"
            value={formData.specialPrice}
            onChange={handleChange}
            step="0.01"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="quantityInStock" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity In Stock:</label>
          <input
            type="number"
            id="quantityInStock"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="active" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Active
          </label>
        </div>
        <button type="submit" disabled={status === 'loading'} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          {status === 'loading' ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
      {status === 'loading' && <p style={{ textAlign: 'center', marginTop: '10px', color: '#007bff' }}>Adding product...</p>}
      {status === 'succeeded' && product && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #28a745', borderRadius: '8px', backgroundColor: '#d4edda', color: '#155724' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Successfully Added:</h3>
          <p><strong>ID:</strong> {product.productID}</p>
          <p><strong>Name:</strong> {product.productName}</p>
          <p><strong>Price:</strong> ${product.price}</p>
        </div>
      )}
      {status === 'failed' && <p style={{ textAlign: 'center', marginTop: '10px', color: '#dc3545' }}>Error: {error}</p>}
    </div>
  );
};

export default ProductAddPresenter;
