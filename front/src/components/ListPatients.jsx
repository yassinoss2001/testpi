import React, { useState, useEffect } from 'react';
import patientService from '../services/patientService';
import Swal from 'sweetalert2';

const ListPatients = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patients from the backend on component mount
  useEffect(() => {
    console.log('Component mounted. Fetching patients...'); // Debugging
    fetchPatients();
  }, []);

  // Function to fetch patients
  const fetchPatients = async () => {
    try {
      console.log('Calling patientService.getPatients()...'); // Debugging
      const patients = await patientService.getPatients();
      console.log('Patients fetched:', patients); // Debugging
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

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List of Patients</h2>
      {patients.length === 0 ? (
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
            {patients.map((patient) => (
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
                    onClick={() => {
                      alert('Update functionality will be implemented later.');
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPatients;