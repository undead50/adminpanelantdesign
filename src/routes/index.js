import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/Auth/Login';
import Create from '../pages/Audit/create';
import AddComment from '../pages/Comment/addcomment';
import Index from '../pages/Audit/index';
import Information from '../pages/Dashboard/Information';
import React from 'react';
import AdminLayout from '../containers/AdminLayout';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<LoginPage/>}></Route>
        <Route element={<AdminLayout/>}>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/createAudit' element={<Create/>}></Route>
          <Route path="/info" element={<Information />}></Route>
          <Route path="/addComment" element={<AddComment />}></Route>
          <Route path="/indexAudit" element={<Index/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
