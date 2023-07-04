import React, { useEffect } from 'react';
import { Form, Input, Button, Layout, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import Spinner from '../../components/Spinner';
import { setUser } from '../../store';
import {useSelector,useDispatch} from 'react-redux'
import { postLoginData } from '../../store/slices/authSlice';
import {useNotification} from '../../hooks/index'
import logo from '../../assets/images/logo.svg'

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.auth);

    useEffect(()=>{
     
      if (error){
        callNotification('Login Error','error')
        return
      }
      if (data){
      
          if (data.Code === '0'){
            dispatch(setUser({
              userName: data.Data.employeeName,
              solId:data.Data.solId,
              email:data.Data.email,
              departmentName:data.Data.departmentName,
              token:data.Data.token,
              domainName:data.Data.domainUserName
            })
            )
            
            navigate('/');
            callNotification('Login Success','success')
          } else {
            callNotification('Login Denied','error')
          }
      }
    }, [data, error])


    const {callNotification} = useNotification();

    // useNotification('Login Denied','error')

    const  onFinish = (values) => {
    // Call the postData function from the custom hook
    const reqData = {
      username:values.username,
      password:values.password
    }
    dispatch(postLoginData(reqData))

  
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #468CC1, #3EAB94)', display: 'flex',  alignItems:'center', justifyContent:'center' }}>
    <Card style={{ maxWidth: '25%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src= {logo}
          alt="Logo"
          style={{ height: 80, width: '90%' }}
        />
      </div>
      <u>
        <h3>Audit Tracking System</h3>
      </u>

      <Form name="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log In
          </Button>
        </Form.Item>
        {loading && <Spinner />}
        <Outlet/>
      </Form>
    </Card>
    </div>
  );
};

export default LoginPage;
