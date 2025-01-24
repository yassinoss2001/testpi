import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import Swal from 'sweetalert2';

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [name, setName] = useState('');

  // Fetch categories from the backend on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const categories = await categoryService.getCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to fetch categories',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Function to handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await categoryService.deleteCategory(id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category deleted successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        fetchCategories(); // Refresh the list of categories
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to delete category',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Handle edit button click
  const handleEdit = (category) => {
    setCurrentCategory(category);
    setName(category.name);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedCategory = { name }; // Create the updated category data object
      await categoryService.updateCategory(currentCategory._id, updatedCategory);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to update category',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List of Categories</h2>
      {categories.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No categories found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{category.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                    onClick={() => handleEdit(category)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for updating category */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Category</h2>
            <form onSubmit={handleUpdate}>
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
                    marginRight: '10px',
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCategories;