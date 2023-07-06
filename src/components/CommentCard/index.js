
import { Car, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


function CommentCard(props) {
    return (
      <div>
        <Card bodyStyle={{ padding: "6px 0px 16px 12px" }}>
        <Row gutter={16}>
              <Col span={6}>
                <div style={{backgroundColor: 'black'}}></div>
                </Col>

        </Row>



        </Card>
        </div>
    )
  }
  
  export default CommentCard;

