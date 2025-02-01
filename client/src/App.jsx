import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import EditAuthor from './components/EditAuthor';

function App() {
  return (
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthorList />} />
      <Route path="/authors/new" element={<AuthorForm />} />
      <Route path="/authors/:id/edit" element={<EditAuthor />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;