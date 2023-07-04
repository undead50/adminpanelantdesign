import {
  Form,
  Select,
  Radio,
  DatePicker,
  Input,
  Button,
  Row,
  Col,
  Space,
  Checkbox,
  InputNumber,
} from "antd";
import { useFetch } from "../../hooks";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import "../../index.css";
import { useNotification } from "../../hooks/index";
import AddMoreTag from "../../components/AddMoreTag";
import Item from "antd/es/list/Item";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

function AddComment() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, []);

  //console.log(location.state)
  //  console.log("hello")
  const { userInfo } = useSelector((state) => state.auth);

  const [commentEntryForm] = Form.useForm();
  const [data, loading, error] = useFetch(
    "/commentHeading/getAllRecords",
    true
  );
  const [deptData, isloading, deptListError] = useFetch(
    "/apims/hodEmployeeList",
    true
  );
  const [executivesData, isExecutivesListLoading, executivesListErr] = useFetch(
    "/apims/getExecutiveList",
    true
  );

  const [auditUnits, setAuditUnits] = useState([]);
  const [auditUnit, setAuditUnit] = useState("");

  const [headList, setHeadList] = useState([]);
  const [head, setHead] = useState(null);
  const [subhead1, setSubHead1] = useState(null);
  const [subhead2, setSubHead2] = useState(null);
  const [subhead3, setSubHead3] = useState(null);
  const [standardComment, setStandardComment] = useState(null);
  const [riskGrade, setRiskRating] = useState(null);

  const [subhead1List, setSubhead1List] = useState([]);
  const [subhead2List, setSubhead2List] = useState([]);
  const [subhead3List, setSubhead3List] = useState([]);
  const [standardCommentList, setStandardCommentList] = useState([]);
  const [executivesList, setExecutivesList] = useState([]);
  const [nonCompliances, setNonCompliances] = useState([]);
  const [specialAttention, setSpecialAttention] = useState(false);
  const [deptList, setDeptList] = useState([]);

  const onSpecialAttentionChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setSpecialAttention(e.target.checked);
  };


  useEffect(() => {
    if (error) {
      return;
    }
    if (data?.headingList) {
      const units = Array.from(
        new Set(data.headingList.map((item) => item.auditUnit))
      );
      const nonCompliances = Array.from(
        new Set(data.headingList.map((item) => item.nonComplianceTo))
      );
      setNonCompliances(nonCompliances);
      setAuditUnits(units);

      console.log(units);
    }
  }, [data]);

  useEffect(() => {
    setDeptList(deptData?.departmentList);
  }, [deptData]);

  useEffect(() => {
    setExecutivesList(executivesData?.executiveList);
  }, [executivesData]);

  useEffect(() => {
    if (data) {
      commentEntryForm.setFieldsValue({
        head: null,
        subHead1: null,
        subHead2: null,
        subHead3: null,
        standardComment: null,
        riskGrade: null,
      });

      setHead(null);
      setSubHead1(null);
      setSubHead2(null);
      setSubHead3(null);
      setStandardComment(null);
      setRiskRating(null);
      setHeadList([]);
      setSubhead1List([]);
      setSubhead2List([]);
      setSubhead3List([]);
      setStandardCommentList([]);

      const heads = Array.from(
        new Set(
          data.headingList
            .filter((item) => item.auditUnit === auditUnit)
            .map((item) => item.head)
        )
      );
      setHeadList(heads);
    }
  }, [auditUnit]);

  useEffect(() => {
    if (data) {
      commentEntryForm.setFieldsValue({
        subHead1: null,
        subHead2: null,
        subHead3: null,
        standardComment: null,
        riskGrade: null,
      });

      setSubHead1(null);
      setSubHead2(null);
      setSubHead3(null);
      setStandardComment(null);
      setRiskRating(null);
      setSubhead2List([]);
      setSubhead3List([]);
      setStandardCommentList([]);

      const subHead1s = Array.from(
        new Set(
          data.headingList
            .filter(
              (item) => item.auditUnit === auditUnit && item.head === head
            )
            .map((item) => item.subHead1)
        )
      );
      setSubhead1List(subHead1s);
    }
  }, [head]);

  useEffect(() => {
    if (data) {
      commentEntryForm.setFieldsValue({
        subHead2: null,
        subHead3: null,
        standardComment: null,
        riskGrade: null,
      });

      setSubHead2(null);
      setSubHead3(null);
      setStandardComment(null);
      setRiskRating(null);
      setSubhead2List([]);
      setSubhead3List([]);
      setStandardCommentList([]);
      const subHead2s = Array.from(
        new Set(
          data.headingList
            .filter(
              (item) =>
                item.auditUnit === auditUnit &&
                item.head === head &&
                item.subHead1 === subhead1
            )
            .map((item) => item.subHead2)
        )
      );

      setSubhead2List(subHead2s);
    }
  }, [subhead1]);

  useEffect(() => {
    if (data) {
      commentEntryForm.setFieldsValue({
        subHead3: null,
        standardComment: null,
        riskGrade: null,
      });

      setSubHead3(null);
      setStandardComment(null);
      setRiskRating(null);
      setSubhead3List([]);
      setStandardCommentList([]);

      if (subhead2 === "N/A") {
        const comments = Array.from(
          new Set(
            data.headingList
              .filter(
                (item) =>
                  item.auditUnit === auditUnit &&
                  item.head === head &&
                  item.subHead1 === subhead1
              )
              .map((item) => item.standardComment)
          )
        );
        setSubHead3(subhead2);
        setStandardCommentList(comments);
        commentEntryForm.setFieldsValue({
          subHead3: subhead2,
        });
      } else {
        const subHead3s = Array.from(
          new Set(
            data.headingList
              .filter(
                (item) =>
                  item.auditUnit === auditUnit &&
                  item.head === head &&
                  item.subHead1 === subhead1 &&
                  item.subHead2 === subhead2
              )
              .map((item) => item.subHead3)
          )
        );
        setSubhead3List(subHead3s);
      }
    }
  }, [subhead2]);

  useEffect(() => {
    if (data) {
      commentEntryForm.setFieldsValue({
        standardComment: null,
        riskGrade: null,
      });

      setStandardComment(null);
      setRiskRating(null);
      setStandardComment(null);
      setRiskRating(null);
      setStandardCommentList([]);

      const comments = Array.from(
        new Set(
          data.headingList
            .filter(
              (item) =>
                item.auditUnit === auditUnit &&
                item.head === head &&
                item.subHead1 === subhead1 &&
                item.subHead2 === subhead2 &&
                item.subHead3 === subhead3
            )
            .map((item) => item.standardComment)
        )
      );
      setStandardCommentList(comments);
    }
  }, [subhead3]);

  useEffect(() => {
    if (data) {
      const comment = data.headingList.find(
        (item) =>
          item.auditUnit === auditUnit &&
          item.head === head &&
          item.subHead1 === subhead1 &&
          item.subHead2 === subhead2 &&
          item.subHead3 === subhead3 &&
          item.standardComment === standardComment
      );
      if (comment) {
        commentEntryForm.setFieldsValue({
          riskGrade: comment.riskGrade,
        });
        setRiskRating(comment.riskGrade);
      }
    }
  }, [standardComment]);

  const onFinish = (values) => {
    // alert(values.onsiteAuditPeriod)

    var comment = values;
    comment['commentSpecialMark'] = comment['commentSpecialMark'].map(specialMarking => ({ specialMarking }));
    comment['createdBy'] = userInfo.domainName
    comment['createdByName'] = userInfo.userName
    comment['commentSpecialAttn'] = []
    
    console.log(comment);

    comment['specialAttentionDeptHead'].forEach(element => {
      
      
    });


    console.log(comment);




  };

  const content = (
    <div style={{ height: "100%", margin: "12px" }}>
      <Form form={commentEntryForm} onFinish={onFinish} layout="vertical">
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item
              name="auditUnit"
              label="Audit Unit"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(e) => setAuditUnit(e)}
                placeholder="Select audit unit"
              >
                {auditUnits?.map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="head" label="Head" rules={[{ required: true }]}>
              <Select onChange={(e) => setHead(e)} placeholder="Select Head">
                {headList.map((head) => (
                  <Option key={head} value={head}>
                    {head}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="subHead1"
              label="Subhead 1"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(e) => setSubHead1(e)}
                placeholder="Select Subhead 1"
              >
                {subhead1List.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="subHead2"
              label="Subhead 2"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(e) => setSubHead2(e)}
                placeholder="Select Subhead 2"
              >
                {subhead2List.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6}>
            <Form.Item
              name="subHead3"
              label="Subhead 3"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(e) => setSubHead3(e)}
                placeholder="Select Subhead 3"
              >
                {subhead3List.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="standardComment"
              label="Standard Comment"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(e) => setStandardComment(e)}
                placeholder="Select Standard Comment"
              >
                {standardCommentList.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="riskGrade"
              label="Risk Grade"
              rules={[{ required: true }]}
            >
              <Input disabled placeholder="Risk Grade"></Input>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="nonCompliance"
              label="Non Compliance"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Non Compliance">
                {nonCompliances.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6}>
            <Form.Item
              name="commentSpecialMark"
              label="Special Markings"
              rules={[{ required: true }]}
            >
              <Select mode="multiple" placeholder="Select Special Markings">
                <Option key={1}>Special Marking 1</Option>
                <Option key={2}>Special Marking 2</Option>
                <Option key={3}>Special Marking 3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="refPolicy"
              label="Ref. Policy/Directive"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter..."></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ marginBottom: "12px" }}>
          <Checkbox onChange={onSpecialAttentionChange}>
            Comment requires special attention.
          </Checkbox>
        </Row>

        {specialAttention && (
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="specialAttentionExecs"
                label="Executive Team"
                rules={[{ required: specialAttention }]}
              >
                <Select mode="multiple" placeholder="Select Special Attention">
                  {executivesList?.map((item) => (
                    <Option key={item.employeeName} value={item.employeeId}>
                      {`${item.employeeName} (${
                        item.functionalTitle === ""
                          ? item.designation
                          : item.functionalTitle
                      })`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="specialAttentionDeptHead"
                label="Department Head"
                rules={[{ required: specialAttention }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select concerned department if/any"
                >
                  {deptList?.map((item) => (
                    <Option key={item.employeeName} value={item.employeeId}>
                      {`${item.employeeName} (${item.departmentName})`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row>
          <Col span={24}>
            <Form.Item
              name="commentInDetail"
              label="Comment Details"
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

        <Form.Item style={{ marginTop: "20px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return content;
}

export default AddComment;
