import axiosInstance from '../config/axios';

const patientService = {
  createPatient: async (categoryId, patientData) => {
    const response = await axiosInstance.post(`/patients/category/${categoryId}`, patientData);
    return response.data;
  },
  getPatients: async () => {
    const response = await axiosInstance.get('/patients');
    return response.data;
  },
  getPatientById: async (id) => {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  },
  updatePatient: async (id, patientData) => {
    const response = await axiosInstance.put(`/patients/${id}`, patientData);
    return response.data;
  },
  deletePatient: async (id) => {
    const response = await axiosInstance.delete(`/patients/${id}`);
    return response.data;
  },
};

export default patientService;
