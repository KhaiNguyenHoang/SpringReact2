import React from 'react';

const ProductListPresenter = ({ products, status, error }) => {
  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (status === 'succeeded') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.productID} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <img src={product.imageUrl} alt={product.productName} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>{product.productName}</h3>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}>{product.description}</p>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>Category: {product.category}</p>
            {product.specialPrice > 0 && product.specialPrice < product.price ? (
              <p style={{ margin: '0', fontSize: '1.1em', color: '#e44d26' }}>
                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '5px' }}>${product.price.toFixed(2)}</span>
                ${product.specialPrice.toFixed(2)}
              </p>
            ) : (
              <p style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>${product.price.toFixed(2)}</p>
            )}
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>In Stock: {product.quantityInStock}</p>
            <p style={{ margin: '0', color: product.status === 'Available' ? 'green' : 'red' }}>Status: {product.status}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ProductListPresenter;
