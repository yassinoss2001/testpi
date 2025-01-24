import React, { useState, useEffect } from 'react';
import patientService from '../services/patientService';
import categoryService from '../services/categoryService';
import Swal from 'sweetalert2';

const ListPatients = () => {
  const [patients, setPatients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch patients and categories on component mount
  useEffect(() => {
    fetchPatients();
    fetchCategories();
  }, []);

  // Function to fetch patients
  const fetchPatients = async () => {
    try {
      const patients = await patientService.getPatients();
      setPatients(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to fetch patients',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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

  // Function to handle patient deletion
  const handleDeletePatient = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this patient!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await patientService.deletePatient(id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Patient deleted successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        fetchPatients(); // Refresh the list of patients
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to delete patient',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Handle edit button click
  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setName(patient.name);
    setLastname(patient.lastname);
    setAge(patient.age);
    setCategoryId(patient.category?._id);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPatient = {
        name,
        lastname,
        age: parseInt(age, 10), // Ensure age is a number
        category: categoryId, // Use the selected category ID
      };

      await patientService.updatePatient(currentPatient._id, updatedPatient);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patient updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      fetchPatients(); // Refresh the list of patients
    } catch (error) {
      console.error('Error updating patient:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to update patient',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List of Patients</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or lastname..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
      </div>

      {filteredPatients.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No patients found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Lastname</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{patient.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{patient.lastname}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{patient.age}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{patient.category?.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                    onClick={() => handleDeletePatient(patient._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEdit(patient)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for updating patient */}
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
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Patient</h2>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '15px' }}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Lastname:</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Age:</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Category:</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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

export default ListPatients;