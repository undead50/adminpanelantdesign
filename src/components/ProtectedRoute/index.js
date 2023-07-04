import { useContext } from 'react';
import LoginPage from '../../pages/Auth/Login';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';



export default function ProtectedRoute({ children }) {


    const { userInfo } = useSelector((state) => state.auth);

        console.log(userInfo)
   
  if(userInfo === null){
    
    return  <Navigate to={'/auth/login'} replace />

  }
  
    return <>{children}</>;
}