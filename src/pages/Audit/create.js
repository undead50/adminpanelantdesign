import { Form, Select, Radio, DatePicker, Input, Button, Row, Col, Modal, InputNumber } from 'antd';
import { useFetch } from '../../hooks';
import { useEffect, useState } from 'react';
import '../../index.css'
import { useNotification } from '../../hooks/index'
import AddMoreTag from '../../components/AddMoreTag';
import { useApiPost } from '../../hooks';
import { useSelector } from "react-redux";
import Spinner from '../../components/Spinner';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;





function Create() {

    const [url, setUrl] = useState('/apims/bmEmployeeList');
    const [ data, loading, error ] = useFetch(url, true);
    const [ deptData, isloading, deptListError ] = useFetch("/apims/hodEmployeeList", true);

    const auditTypes = ['Internal Audit', 'Statutory Audit', 'NRB Inspection']
    const fiscalYears = ['2079/2080', '2080/2081', '2081/2082']
    const [branchDeptOptions, setbranchDeptOptions] = useState([]);
    const { callNotification } = useNotification();
    const [selectedbranchDept, setSelectedbranchDept] = useState(null);
    const [branchOrDepartment, setbranchOrDepartment] = useState('Branch');

    const [postURL, setPostURL] = useState(null);
   
    const [postData, setpostData] = useState(null);
    const [ isLoading, response, postError ] = useApiPost(postURL, postData);

    const [auditTeam, setAuditTeamMembers] = useState([]);
    const [auditEntryForm] = Form.useForm();

    const [branchList, setBranchList] = useState([]);
    const [deptList, setDeptList] = useState([]);


    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        if (branchOrDepartment === 'Branch') {

            const selectedBranch = branchList?.find((branch) => branch.solDesc === selectedbranchDept);
            if (selectedBranch !== undefined) {
                console.log("selected:::" + selectedBranch)

                auditEntryForm.setFieldsValue({
                    auditHead: selectedBranch.employeeName,
                    corporateTitleAuditHead: selectedBranch.branchManagerDesignation
                })
            }

        }
        else {
            
            const selectedDept = deptList?.find((dept) => dept.departmentName === selectedbranchDept);
            if (selectedDept !== undefined) {
                console.log("selected:::" + selectedDept)
                auditEntryForm.setFieldsValue({
                    auditHead: selectedDept.employeeName,
                    corporateTitleAuditHead: selectedDept.designation
                })
            }
        }

    }, [selectedbranchDept])



    const callback = (items) => {
        setAuditTeamMembers(items)
    }

    useEffect(() => {
        auditEntryForm.setFieldsValue({
            auditTeam: auditTeam
        })
    }, [auditTeam])



    useEffect(() => {
        auditEntryForm.setFieldsValue({
            auditUnit: branchOrDepartment
        })

        if (branchOrDepartment === 'Department') {
            setbranchDeptOptions(deptData?.departmentList.map(a => a.departmentName))
        }
        else {
            setbranchDeptOptions(data?.branchList.map(a => a.solDesc))
        }

    }, [branchOrDepartment]);

    useEffect(() => {
            if (error) {

                if (error?.request) {
                    alert(error.code)
                }
                else if (error?.response) {
                    alert(error.response)
                   
                }
                return
            }

            if ( data?.branchList ) {
                    setBranchList(data.branchList)
                    setbranchDeptOptions(data.branchList.map(a => a.solDesc))
            }
        
        
    }, [data]);


    useEffect(()=> {

        if (deptData?.departmentList){
            setDeptList(deptData.departmentList)
        }       
    }, [deptData])




    const handleBranchDepartment = (e) => {
        auditEntryForm.setFieldsValue({
            auditUnitDesc: null,
            auditHead: null,
            corporateTitleAuditHead: null
        })
        setbranchDeptOptions([])
        setbranchOrDepartment(e.target.value)
    }


    useEffect(() => {
        if (response) {
            //alert(response.status)
            if (response.status===200){
              
                Modal.success({
                    content: 'Audit record added successfully.',
                    onOk: () => {
                        auditEntryForm.resetFields()
                        setpostData(null)
                        auditEntryForm.setFieldsValue({
                            auditUnit: "Branch"
                        })
                    }
                  });
            }
           setPostURL(null)      

        }
        if (postError){
            if (postError.request){
                alert(postError.request.status)
            }   
            else if (postError.response){
                alert(postError.response.status )
            }   
            setPostURL(null)
           
        }
        if (!isLoading){
            
        }

    }, [response, postError, isLoading]);


    const onFinish = (values) => {
      
        var   postData = values
        postData['auditStartDate'] = values.auditPeriod[0].format('YYYY-MM-DD')
        postData['auditEndDate'] = values.auditPeriod[1].format('YYYY-MM-DD')
        postData['onsiteStartDate'] = values.onsiteAuditPeriod[0].format('YYYY-MM-DD')
        postData['onsiteEndDate'] = values.onsiteAuditPeriod[1].format('YYYY-MM-DD')
        postData['createdBy'] = userInfo.domainName
        postData['createdByName'] = userInfo.userName
        postData['auditTeam'] = auditTeam.map(memberName => ({ memberName }));
        delete postData.onsiteAuditPeriod;
        delete postData.auditPeriod;
        setpostData(postData)
        setPostURL('/auditMaster/addRecord')

    };


    const content =

        <div style={{ height: '100%', margin: '12px' }}>
            <Form form={auditEntryForm} onFinish={onFinish} layout='vertical' >

                <h2>Audit Entry Form</h2>



                <Row gutter={20} >

                    <Col span={6}>

                        <Form.Item name="typeOfAudit" label="Type of Audit" rules={[{ required: true, message: 'Select audit type.' }]}>
                            <Select placeholder="Select audit type" >
                                {auditTypes.map((type) => (
                                    <Option key={type} value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="fiscalYear" label="Fiscal Year" rules={[{ required: true, message: 'Select fiscal year.' }]}>
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

                        <Form.Item name="auditUnitDesc" label={branchOrDepartment} rules={[{ required: true, message: `Select ${branchOrDepartment}` }]}>
                            <Select onChange={(e) => setSelectedbranchDept(e)} showSearch placeholder={`Select ${branchOrDepartment}`} >
                                {branchDeptOptions?.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>

                </Row>




                <Row gutter={20} >

                    <Col span={6}>

                        <Form.Item name="corporateTitleAuditHead" label="Title" rules={[{ required: true, message: "Required" }]}>
                            <Input >

                            </Input>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="auditHead" label={branchOrDepartment === 'Branch' ? "Branch Manager" : "Head of Department"} rules={[{ required: true, message: 'Required' }]}>
                            <Input >

                            </Input>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name="auditPeriod" label="Audit Period (Start-End Date)" rules={[{ required: true, message: 'Enter audit period.' }]}>
                            <RangePicker />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name="onsiteAuditPeriod" label="Onsite Audit Period" rules={[{ required: true, message: 'Enter onsite audit period.' }]}>
                            <RangePicker />
                        </Form.Item>
                    </Col>


                    <Col span={6}>
                        <Form.Item name="netWorkingDays" label="Net Working Days" rules={[{ required: true, message: 'Enter net working days.' }]}>
                            <InputNumber min={1} type='number' placeholder='Enter...' style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>

                        <Form.Item name="auditLeader" label="Audit Team Leader" rules={[{ required: true, message: 'Enter audit team leader name.' }]}>
                            <Input placeholder='Please enter...'></Input>
                        </Form.Item>
                    </Col>




                </Row>

                <Row gutter={20} >




                    <Col span={24}>
                        <Form.Item name="auditTeam" label="Audit Team Members" rules={[{ required: true, message: `Add audit team members.` }]}>
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





                </Row>

                <Row>
                    <Col span={24}>

                        <Form.Item name="staffAtBranch" label="No. of Staff at time of Audit " rules={[{ required: true }]}>

                            <TextArea style={{ width: "100%" }} placeholder='Please enter...' rows={5} />

                        </Form.Item>
                    </Col>

                </Row>



                <Form.Item style={{ marginTop: "20px" }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>


            </Form>

            {isLoading && <Spinner />}
            {/* <Modal success title="Audit Record added successfully." cancelButtonProps={{ style: { display: 'none' } }} closable={false} centered open={isModalOpen} onOk={handleOk} >
                
             </Modal> */}

        </div>
    return (content);
}

export default Create;