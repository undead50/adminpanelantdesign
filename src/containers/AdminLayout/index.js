import React, { useState } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBard from '../../components/Sidebar';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login')
    
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} style={{background: 'white'}}>
        <div className="logo">

        <img src="https://www.ctznbank.com/assets/backend/uploads/logo-new.png" alt="Company Logo"
        style={{
          height:'40px',
          width:'180px',
          
        }}
        />
        </div>
        <SideBard/>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: 'linear-gradient(to right, #468CC1, #3EAB94)',padding: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ color: 'white', padding: '0 16px', fontSize: '18px' }}
            >
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginTop:'10px',marginRight:'20px'}}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content className='site-layout-background' style={{ margin: '16px' , padding:'12px', height: '100%',}}>
        
          <div
          
           
          >
            <Outlet/>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center', height:'50px', display:'flex', justifyContent:'center', alignContent:'center' }}>
          <h3>Citizens Bank International ©2023</h3> 
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
