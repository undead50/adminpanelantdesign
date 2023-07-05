import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import {
  Card,
  Button,
  Row,
  Col,
  Space,
  Modal,
  Divider,
  Radio,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Form,
} from "antd";
import AddComment from "../Comment/addcomment";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function AuditDetails() {
  const [comments, setComments] = useState([]);
  const [branchOrDepartment, setbranchOrDepartment] = useState("Branch");
  const [okButtonClicked, setOkButtonClicked] = useState(0);
  const [selectedbranchDept, setSelectedbranchDept] = useState(null);

  const callback = (comment) => {
    setModalOpen(false);
    setOkButtonClicked(false);
    console.log("comment::::::::");
    console.log(comment);
    setComments([...comments, comment]);
    console.log(comments);
  };

  //get url parameter
  const { auditID } = useParams();
  console.log(comments);

  const [audit, setAudit] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      setOkButtonClicked(0);
    }
  }, [modalOpen]);

  //props from navigate
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setAudit(location.state);
  }, []);

  const content = (
    <div style={{ height: "100%", margin: "12px" }}>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Row align="middle" style={{ marginTop: "0px" }}>
          <Col align span={12}>
            <h2 style={{ margin: 0 }}>Audit Details </h2>
          </Col>
          <Col span={12} align="right">
            <Button onClick={() => setModalOpen(true)} type="primary">
              Add Comment
            </Button>
          </Col>
        </Row>
        <Card style={{ marginTop:'16px' }}>
          <Form layout="vertical">
            <Row  gutter={[16, 0]}>
              <Col span={6}>
                   <Form.Item style={{marginBottom:4}} 
                  name="typeOfAudit"
                  label="Type of Audit"
                  rules={[{ message: "Select audit type." }]}
                >
                  <Select placeholder="Select audit type"></Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                   <Form.Item style={{marginBottom:4}} 
                  name="fiscalYear"
                  label="Fiscal Year"
                  rules={[{ message: "Select fiscal year." }]}
                >
                  <Select placeholder="Select a fiscal year"></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                     <Form.Item style={{marginBottom:4}} 
                    name="auditUnit"
                    label="Audit Unit"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group disabled>
                      <Radio value="Branch">Branch</Radio>
                      <Radio value="Department">Department</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>

              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}  name="auditUnitDesc">
                  <Select
                    onChange={(e) => setSelectedbranchDept(e)}
                    showSearch
                  ></Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="corporateTitleAuditHead"
                  label="Title"
                  rules={[{ message: "Required" }]}
                >
                  <Input></Input>
                </Form.Item>
              </Col>

              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="auditHead"
                  label={
                    branchOrDepartment === "Branch"
                      ? "Branch Manager"
                      : "Head of Department"
                  }
                  rules={[{ message: "Required" }]}
                >
                  <Input></Input>
                </Form.Item>
              </Col>

              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="auditPeriod"
                  label="Audit Period (Start-End Date)"
                  rules={[{ message: "Enter audit period." }]}
                >
                  <RangePicker />
                </Form.Item>
              </Col>

              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="onsiteAuditPeriod"
                  label="Onsite Audit Period"
                  rules={[{ message: "Enter onsite audit period." }]}
                >
                  <RangePicker />
                </Form.Item>
              </Col>

              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="netWorkingDays"
                  label="Net Working Days"
                  rules={[{ message: "Enter net working days." }]}
                >
                  <InputNumber
                    min={1}
                    type="number"
                    placeholder="Enter..."
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                   <Form.Item style={{marginBottom:4}}
                  name="auditLeader"
                  label="Audit Team Leader"
                  rules={[{ message: "Enter audit team leader name." }]}
                >
                  <Input placeholder="Please enter..."></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={24}>
                   <Form.Item style={{marginBottom:4}}
                  name="auditTeam"
                  label="Audit Team Members"
                  rules={[{ message: `Add audit team members.` }]}
                ></Form.Item>
              </Col>


            </Row>

            <Row>
              <Col span={24}>
                   <Form.Item style={{marginBottom:4}}
                  name="staffAtBranch"
                  label="No. of Staff at time of Audit "
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: "100%" }}
                    placeholder="Please enter..."
                    rows={5}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {comments.map((comment) => (
          <Card title={comment.subHead1} />
        ))}
        { comments.length !== 0 && <Button
          style={{ width: "100%" }}
          onClick={() => setModalOpen(true)}
          type="primary">
          Add More Comment
        </Button>}
      </Space>
      <Modal
        title={<h2 style={{ margin: "0px 0 16px 12px" }}>Add Comment</h2>}
        centered
        okText="Add Comment"
        width={"80%"}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          setOkButtonClicked(okButtonClicked + 1);
        }}
        open={modalOpen}
      >
        <Divider style={{ margin: 0 }}></Divider>
        <div
          bordered={true}
          style={{ overflow: "auto", height: "70vh", padding: "10px 0 0 0" }}
        >
          <AddComment
            addCommentCallback={callback}
            auditId={auditID}
            okButtonClicked={okButtonClicked}
          />
        </div>
      </Modal>
    </div>
  );
  return content;
}

export default AuditDetails;
