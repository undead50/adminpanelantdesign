import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/Auth/Login';
import Create from '../pages/Audit/create';
import AddComment from '../pages/Comment/addcomment';
import Index from '../pages/Audit/index';
import ListAudit from '../pages/Audit/list';
import Information from '../pages/Dashboard/Information';
import React from 'react';
import AdminLayout from '../containers/AdminLayout';
import AuditDetails from '../pages/Audit/details';
import ProtectedRoute from '../components/ProtectedRoute'

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "auth/login" element={<LoginPage/>}></Route>

        <Route path = "" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/createAudit' element={<Create/>}></Route>
          <Route path="/info" element={<Information />}></Route>
          <Route path="/addComment" element={<AddComment />}></Route>
          <Route path="/listAudit" element={<ListAudit/>}></Route>
          <Route path="/auditDetails/:auditID" element={<AuditDetails/>}></Route>
        </Route>
     
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
