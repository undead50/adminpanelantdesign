import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Card, Button, Row, Col, Space, Modal, Divider } from "antd";
import AddComment from "../Comment/addcomment";

function AuditDetails() {
  //get url parameter
  const { auditID } = useParams();

  const [audit, setAudit] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  //props from navigate
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setAudit(location.state);
  }, []);

  const content = (
    <div style={{ height: "100%", margin: "12px" }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row align="middle" style={{ marginTop: "12px" }}>
          <Col align span={12}>
            <h2 style={{ margin: 0 }}>Audit Details </h2>
          </Col>
          <Col span={12} align="right">
            <Button onClick={() => setModalOpen(true)} type="primary">
              Add Comment
            </Button>
          </Col>
        </Row>
        <Card></Card>
      </Space>
      <Modal
        title={<h2 style={{ margin: "0px 0 16px 12px" }}>Add Comment</h2>}
        centered
        width={"80%"}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
      >
        <Divider style={{margin:0}}></Divider>
        <div
          bordered={true}
          style={{ overflow: "auto", height: "70vh", padding: "10px 0 0 0" }}
        >
          <AddComment />
        </div>
      </Modal>
    </div>
  );
  return content;
}

export default AuditDetails;
