import React, { useState } from 'react';
import categoryService from '../services/categoryService'; // Import categoryService
import Swal from 'sweetalert2';

const AddCategory = () => {
  const [name, setName] = useState(''); // State for category name

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please enter a category name',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const categoryData = { name }; // Create the category data object
      await categoryService.createCategory(categoryData); // Send the data to the backend
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category added successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      setName(''); // Clear the input field
    } catch (error) {
      console.error('Error adding category:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to add category',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;