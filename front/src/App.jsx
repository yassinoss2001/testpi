import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure this is imported correctly
import ListPatients from './components/ListPatients';
import ListCategories from './components/ListCategories';
import AddCategory from './components/AddCategory';
import AddPatient from './components/AddPatient';
import NotFound from './components/NotFound'; // Ensure this is imported correctly

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPatients />} />
          <Route path="/ListCategories" element={<ListCategories />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/AddPatient" element={<AddPatient />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;