import { Form, Select, Radio, DatePicker, Input, Button, Row, Col, Space, InputNumber } from 'antd';
import { useFetch } from '../../hooks';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';
import '../../index.css'
import { useNotification } from '../../hooks/index'
import AddMoreTag from '../../components/AddMoreTag';

const { Option } = Select;
const { RangePicker } = DatePicker;

const { Search } = Input;
const onSearch = (value) => console.log(value);


function Create() {

    const [url, setUrl] = useState('/apims/bmEmployeeList');
    const { data, loading, error } = useFetch(url, true);
    const auditTypes = ['Internal Audit', 'Statutory Audit', 'NRB Inspection']
    const fiscalYears = ['2079/2080', '2080/2081', '2081/2082']
    const [branchDeptOptions, setbranchDeptOptions] = useState([]);
    const { callNotification } = useNotification();
    const [selectedbranchDept, setSelectedbranchDept] = useState(null);
    const [branchOrDepartment, setbranchOrDepartment] = useState('Branch');

    const [auditTeamMembers, setAuditTeamMembers] = useState([]);
    const [auditEntryForm] = Form.useForm();

    const [branchList, setBranchList] = useState([]);
    const [deptList, setDeptList] = useState([]);


    const steps = [
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
        {
          title: 'Last',
          content: 'Last-content',
        },
      ];



    useEffect(()=> {
        console.log(selectedbranchDept)
        if(branchOrDepartment === 'Branch'){

            if(branchList.length===0){
                    return
            }
            
            const  selectedBranch = branchList.find((branch) => branch.solDesc === selectedbranchDept);
            if (selectedBranch !== undefined){
            console.log("selected:::"+ selectedBranch)
    
                auditEntryForm.setFieldsValue({
                    HODorBM: selectedBranch.employeeName
                })
            }

        }
        else {
            if(deptList.length===0){
                return
           }

           const  selectedDept = deptList.find((dept) => dept.departmentName === selectedbranchDept);
           if (selectedDept !== undefined){
            console.log("selected:::"+ selectedDept)
    
                auditEntryForm.setFieldsValue({
                    HODorBM: selectedDept.employeeName
                })
            }

        }


    }, [selectedbranchDept])

    const  callback = (items) => {
        setAuditTeamMembers(items)
    }

    useEffect(()=> {
        auditEntryForm.setFieldsValue({
            auditTeamMembers: auditTeamMembers
        })
    }, [auditTeamMembers])



    useEffect(() => {
        if (branchOrDepartment === "Branch") {
            setUrl('/apims/bmEmployeeList');
        }
        else {
            setUrl('/apims/hodEmployeeList')
        }
        auditEntryForm.setFieldsValue({
            auditUnit: branchOrDepartment
        })

    }, [branchOrDepartment]);

    useEffect(() => {
        if (branchOrDepartment === "Branch") {
            console.log("isLoading:::" + loading)
            if (error) {
               alert(error.response.status)
                return
            }

            if (data) {
                console.log("branchList:::" + data.branchList)
                setBranchList(data.branchList)
                setbranchDeptOptions(data.branchList.map(a => a.solDesc))
            }
        } else {
            if (data) {
                setDeptList(data.departmentList)
                console.log("deptList:::" + data.departmentList)
                setbranchDeptOptions(data.departmentList.map(a => a.departmentName))
            }

        }
    }, [data, error, loading]);


    const handleBranchDepartment = (e) => {
        auditEntryForm.setFieldsValue({
            branchDepartment: null,
            HODorBM: null

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


    const content = 
    
    <div style={{height: '100%', margin: '12px'}}>
    <Form form={auditEntryForm} onFinish={onFinish} layout='vertical' >

        <h2>Audit Entry Form</h2>

   

        <Row gutter={20} >

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
                    <Select onChange={(e)=>setSelectedbranchDept(e)} showSearch allowClear placeholder={`Select ${branchOrDepartment}`} >
                        {branchDeptOptions.map((item) => (
                            <Option key={item} value={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>



            </Col>

        </Row>




        <Row gutter={20} >
            <Col span={6}>

                <Form.Item name="HODorBM" label={branchOrDepartment === 'Branch' ? "Branch Manager" : "Head of Department"} rules={[{ required: true }]}>
                    <Select  disabled>
                      
                      
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
                <Form.Item name="netWorkingDays" label="Net Working Days" rules={[{ required: true }]}>
                    <InputNumber min = {1} placeholder='Enter...'  style={{ width: '100%' }}/>
                </Form.Item>
            </Col>

           

        </Row>

        <Row gutter={20} >


        <Col span={6}>

<Form.Item name="auditTeamLeader" label="Audit Team Leader" rules={[{ required: true }]}>
    <Input placeholder='Please enter...'></Input>
</Form.Item>
</Col>

            <Col span={6}>
            <Form.Item  name="auditTeamMembers" label="Audit Team Members"  rules={[{ required: true }]}>
                <AddMoreTag parentCallback={callback}></AddMoreTag>
                </Form.Item>
            </Col>

            {/* <Col span={6}>
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
            </Col> */}

            <Col span={6}>
                <Form.Item name="No of staff" label="No of staff at time of Audit" rules={[{ required: true }]}>
                    <InputNumber min = {1} placeholder='Enter...'  style={{ width: '100%' }}/>
                </Form.Item>
            </Col>



        </Row>

      

        <Form.Item style={{marginTop: "20px"}}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>


    </Form>
    </div>
    return (content);
}

export default Create;