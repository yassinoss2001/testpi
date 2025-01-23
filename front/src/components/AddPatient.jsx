import React, { useState, useEffect } from 'react';
import patientService from '../services/patientService';
import categoryService from '../services/categoryService';
import Select from 'react-select';
import Swal from 'sweetalert2';

const AddPatient = () => {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // state for categories (for the dropdown)
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await categoryService.getCategories();
      // transform categories data for react select
      const options = categoriesData.map((category) => ({
        value: category._id, // Use _id for MongoDB
        label: category.name,
      }));
      setCategories(options);
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to fetch categories',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please select a category',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const patientData = {
      name,
      lastname,
      age: parseInt(age, 10),
    };

    try {
      await patientService.createPatient(selectedCategory.value, patientData);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patient created successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      setName('');
      setLastname('');
      setAge('');
      setSelectedCategory(null);
    } catch (error) {
      if (error.response) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Failed to create patient: ${error.response.data.message || 'Unknown error'}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to create patient. Please check your network connection and try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Lastname:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Select a category"
            isSearchable
            required
            styles={{
              control: (base) => ({
                ...base,
                padding: '5px',
                fontSize: '16px',
              }),
            }}
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
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;