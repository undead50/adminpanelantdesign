import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import Spinner from '../../components/Spinner';
import { setUser } from '../../store';
import {useSelector,useDispatch} from 'react-redux'
import { postLoginData } from '../../store/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


    const { data, loading, error } = useSelector((state) => state.auth);

    const onFinish = (values) => {
    // Call the postData function from the custom hook
    const reqData = {
      username:values.username,
      password:values.password
    }
    dispatch(postLoginData(reqData))
    alert(data)
    console.log(data)
    if (data.Code === "0"){
        dispatch(setUser({
          userName: data.Data.userName,
          solId:data.Data.solId,
          email:data.Data.email,
          departmentName:data.Data.departmentName,
          token:data.Data.token
      }))
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', marginTop: 200 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src="https://www.ctznbank.com/assets/backend/uploads/logo-new.png"
          alt="Logo"
          style={{ height: 80 }}
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
    </div>
  );
};

export default LoginPage;
