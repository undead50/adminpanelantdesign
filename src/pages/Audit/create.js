import { Form, Select, Radio, DatePicker, Input, Button, Row, Col, Space } from 'antd';
import { useFetch } from '../../hooks';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';
import '../../index.css'
import { useNotification } from '../../hooks/index'

const { Option } = Select;
const { RangePicker } = DatePicker;



function Create() {

    const [url, setUrl] = useState('/apims/branchList');
    const { data, loading, error } = useFetch(url, true);
    const auditTypes = ['Internal Audit', 'Statutory Audit', 'NRB Inspection']
    const fiscalYears = ['2079/2080', '2080/2081', '2081/2082']
    const [branchDeptOptions, setbranchDeptOptions] = useState([]);
    const { callNotification } = useNotification();
    const [selectedbranchDept, setSelectedbranchDept] = useState(null);
    const [branchOrDepartment, setbranchOrDepartment] = useState('Branch');


    const [auditEntryForm] = Form.useForm();

    useEffect(() => {


        if (branchOrDepartment === "Branch") {
            setUrl('/apims/branchList');
        }
        else {
            setUrl('/apims/departmentList')
        }
    }, [branchOrDepartment]);


    useEffect(() => {
        if (branchOrDepartment === "Branch") {
            console.log("isLoading:::" + loading)
            if (error) {
                alert(error.response.status)
                return
            }

            if (data) {
                console.log("branchList:::" + data.Data.categoriesList)
                setbranchDeptOptions(data.Data.categoriesList.map(a => a.REF_DESC))
            }
        } else {
            if (data) {
                console.log("deptList:::" + data.Data.departmentList)
                setbranchDeptOptions(data.Data.departmentList.map(a => a.departmentName))
            }

        }
    }, [data, error, loading]);


    const handleBranchDepartment = (e) => {
        auditEntryForm.setFieldsValue({
            branchDepartment: null
        })

        setbranchOrDepartment(e.target.value)
    }

    const onFinish = (values) => {
        console.log('Form values:', values);
        alert(values.fiscalYear)
        // alert(values.onsiteAuditPeriod)
        values.onsiteAuditPeriod.map((data) => {
            alert(data.format('YYYY-MM-DD'))
        })
        alert(values.acmDate.format('YYYY-MM-DD'))
    };


    const content = <Form form={auditEntryForm} onFinish={onFinish} layout='vertical'>

        <h2>Audit Entry Form</h2>

        <Space direction='vertical' size={12} block = {true} >

        <Row gutter={16} >

            <Col span={6}>

                <Form.Item name="auditType" label="Type of Audit" rules={[{ required: true }]}>
                    <Select placeholder="Select audit type" >
                        {auditTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="fiscalYear" label="Fiscal Year" rules={[{ required: true }]}>
                    <Select placeholder="Select a fiscal year">
                        {fiscalYears.map((year) => (
                            <Option key={year} value={year}>{year}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            <Col span={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <Form.Item name="auditUnit" label="Audit Unit" rules={[{ required: true }]}>
                        <Radio.Group onChange={handleBranchDepartment} defaultValue={branchOrDepartment} >

                            <Radio value="Branch">Branch</Radio>
                            <Radio value="Department">Department</Radio>

                        </Radio.Group>
                    </Form.Item>
                </div>

            </Col>

            <Col span={6}>

                <Form.Item name="branchDepartment" label={branchOrDepartment} rules={[{ required: true }]}>
                    <Select value={selectedbranchDept} showSearch allowClear placeholder={`Select ${branchOrDepartment}`} >
                        {branchDeptOptions.map((item) => (
                            <Option key={item} value={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>



            </Col>

        </Row>




        <Row gutter={16} >
            <Col span={6}>

                <Form.Item name="headOfAuditUnit" label="Head of Audit Unit (BM/Dept Head)" rules={[{ required: true }]}>
                    <Select mode="multiple">
                        <Option value="head1">Head 1</Option>
                        {/* Add more options as needed */}
                    </Select>
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="auditPeriod" label="Audit Period (Start-End Date)" rules={[{ required: true }]}>
                    <RangePicker />
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="onsiteAuditPeriod" label="Onsite Audit Period" rules={[{ required: true }]}>
                    <RangePicker />
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="auditTeamLeader" label="Audit Team Leader" rules={[{ required: true }]}>
                    <Input placeholder='Please enter...'></Input>
                </Form.Item>
            </Col>

        </Row>

        <Row gutter={16} >

            <Col span={6}>
                <Form.Item name="auditTeamList" label="Audit Team List" rules={[{ required: true }]}>
                    <Input placeholder='Please enter'></Input>
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="acmNo" label="ACM No" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="acmDate" label="ACM Date" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }}
                        format='YYYY-MM-DD'
                    />
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="No of staff" label="No of staff at time of Audit" rules={[{ required: true }]}>
                    <Input placeholder='Enter...' type='Number' />
                </Form.Item>
            </Col>



        </Row>

        </Space>

        <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>


    </Form>
    return (content);
}

export default Create;