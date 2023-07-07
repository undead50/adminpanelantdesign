import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  CaretRightFilled, ExclamationCircleFilled
} from "@ant-design/icons";

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
  Tag,
  Typography,
  Table,
} from "antd";
import AddComment from "../Comment/addcomment";
import dayjs from "dayjs";
import CommentCard from "../../components/CommentCard";
import Spinner from '../../components/Spinner';
import { useApiPost } from "../../hooks";

const { Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function AuditDetails() {

  const [postURL, setPostURL] = useState(null);
   
  const [postData, setpostData] = useState(null);
  const [ isLoading, response, postError ] = useApiPost(postURL, postData);


  useEffect(()=>{
    if (postError){
      setPostURL(null)
    }

    console.log(response)
    

  }, [response, postError])

  const columns = [
    {
      title: "Audit Unit",
      dataIndex: "auditUnit",
      key: "auditUnit",
    },
    {
      title: "Head",
      dataIndex: "head",
      key: "head",
    },
    {
      title: "Subhead 1",
      dataIndex: "subHead1",
      key: "subHead1",
    },
    {
      title: "Subhead 2",
      dataIndex: "subHead2",
      key: "subHead2",
    },
    {
      title: "Subhead 3",
      dataIndex: "subHead3",
      key: "subHead3",
    },
    {
      title: "Standard Comment",
      dataIndex: "standardComment",
      key: "standardComment",
    },

    {
      title: "Risk Grade",
      dataIndex: "riskGrade",
      key: "riskGrade",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          {" "}
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => console.log("hello")}
          ></Button>
          <Button
            danger
            icon={<DeleteFilled />}
            onClick={() => showDeleteConfirm(record)
            }
          ></Button>
        </Space>
      ),
    },
  ];


  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Confirm Delete?',
      icon: <ExclamationCircleFilled />,
      content: 'Delete this comment? You will not be able to undo this action.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered:'true',
      onOk() {
        setComments(comments.filter(c => c.id !== record.id))
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };



  const showSubmitConfirm = () => {
    confirm({
      title: 'Confirm Submit?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText:'Submit',
      onOk() {
          setpostData(comments);
          setPostURL('/auditComment/addComment')
      },
      onCancel() {},
    });
  };

  const [comments, setComments] = useState([]);
  const [branchOrDepartment, setbranchOrDepartment] = useState("Branch");
  const [okButtonClicked, setOkButtonClicked] = useState(0);
  const [cancelBtnPressed, setCancelBtnPressed] = useState(false);

  const [auditDetailForm] = Form.useForm();

  const callback = (comment) => {
    setModalOpen(false);
    setOkButtonClicked(false);
    setComments([...comments, comment]);
    console.log(comments);
  };

  //get url parameter
  const { auditID } = useParams();
  console.log(comments);

  const [audit, setAudit] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    if (!modalOpen) {          
        setOkButtonClicked(0);  
    }
  }, [modalOpen]);




  //props from navigate
  const location = useLocation();
  useEffect(() => {
    setAudit(location.state);
  }, []);

  useEffect(() => {
    if (audit) {
      console.log(audit);
      setbranchOrDepartment(audit?.auditUnit);

      Object.keys(audit).forEach((key) => {
        if (
          [
            "onsiteEndDate",
            "onsiteStartDate",
            "auditStartDate",
            "auditEndDate",
          ].includes(key)
        ) {
          auditDetailForm.setFieldValue("auditPeriod", [
            dayjs(audit["auditStartDate"], dateFormat),
            dayjs(audit["auditEndDate"], dateFormat),
          ]);
          auditDetailForm.setFieldValue("onsiteAuditPeriod", [
            dayjs(audit["onsiteStartDate"], dateFormat),
            dayjs(audit["onsiteEndDate"], dateFormat),
          ]);
        } else {
          if (audit[key]) {
            auditDetailForm.setFieldValue(key, audit[key]);
          }
        }
      });

     
    }
  }, [audit]);

  const content = (
    <div style={{ height: "100%", margin: "12px" }}>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Row align="middle" style={{ marginTop: "0px" }}>
          <Col align span={12}>
            <h2 style={{ margin: 0 }}>Audit Details </h2>
          </Col>
          {comments.length === 0 && (  <Col span={12} align="right">
            <Button icon = {<PlusOutlined/>} onClick={() => setModalOpen(true)} type="primary">
              Add Comment
            </Button>
          </Col>
          )}
        </Row>
        <Card style={{ marginTop: "16px" }}>
          <Form form={auditDetailForm} layout="vertical">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="typeOfAudit"
                  label="Type of Audit"
                >
                  <Input disabled></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="fiscalYear"
                  label="Fiscal Year"
                >
                  <Input disabled></Input>
                </Form.Item>
              </Col>

              <Col span={6}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Form.Item
                    style={{ marginBottom: 12 }}
                    name="auditUnit"
                    label="Audit Unit"
                  >
                    <Radio.Group disabled>
                      <Radio value="Branch">Branch</Radio>
                      <Radio value="Department">Department</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={branchOrDepartment}
                  style={{ marginBottom: 12 }}
                  name="auditUnitDesc"
                >
                  <Input disabled></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="corporateTitleAuditHead"
                  label="Title"
                  rules={[{ message: "Required" }]}
                >
                  <Input disabled></Input>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="auditHead"
                  label={
                    branchOrDepartment === "Branch"
                      ? "Branch Manager"
                      : "Head of Department"
                  }
                  rules={[{ message: "Required" }]}
                >
                  <Input disabled></Input>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="auditPeriod"
                  label="Audit Period (Start-End Date)"
                  rules={[{ message: "Enter audit period." }]}
                >
                  <RangePicker disabled />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="onsiteAuditPeriod"
                  label="Onsite Audit Period"
                  rules={[{ message: "Enter onsite audit period." }]}
                >
                  <RangePicker disabled />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="netWorkingDays"
                  label="Net Working Days"
                >
                  <InputNumber
                    disabled
                    min={1}
                    type="number"
                    placeholder="Enter..."
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 12 }}
                  name="auditLeader"
                  label="Audit Team Leader">
                  <Input disabled></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: '12px', marginTop:'8px' }}
                  name="auditLeader"
                  label="Audit Team Members"
                >
                  {audit?.auditTeam.map((team) => (
                    <Tag style={{ borderColor: "#F3EEEE" }}>
                      {team?.memberName}
                    </Tag>
                  ))}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: "24px" }}
                  name="staffAtBranch"
                  label="No. of Staff at time of Audit"
                >
                  <Card
                    bodyStyle={{ padding: "12px" }}
                    style={{
                      margin: "0px",
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      borderColor: "#F3EEEE",
                    }}
                  >
                    'Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.'
                  </Card>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          {comments.length !== 0 && (
            <div>
              <Divider>Comments</Divider>

              <Table
                style={{ paddingTop: "24px" }}
                columns={columns}
                dataSource={comments}
                size="small"
              ></Table>

              <Row gutter={16} align="end" style={{ marginTop: "12px" }}>
                <Col>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setModalOpen(true)}
                    type="primary"
                    >
                    Add More Comment
                  </Button>
                </Col>
                <Col>
                  <Button
                    icon={<CaretRightFilled />}
                    onClick={() => showSubmitConfirm()}
                    type="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Card>
      </Space>
      <Modal
        title={<h2 style={{ margin: "0px 0 16px 12px" }}>Add Comment</h2>}
        centered
        destroyOnClose
        okText="Add"
        width={"80%"}
        onCancel={() => 
          setModalOpen(false)
 
        }
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
            tempId = {comments.length}
            okButtonClicked={okButtonClicked}
          />
        </div>
      </Modal>
    </div>
  );
  return content;
}

export default AuditDetails;
