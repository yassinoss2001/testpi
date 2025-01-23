import axiosInstance from '../config/axios';

const categoryService = {
  createCategory: async (categoryData) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  },
  getCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },
  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },
  updateCategory: async (id, categoryData) => {
    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
