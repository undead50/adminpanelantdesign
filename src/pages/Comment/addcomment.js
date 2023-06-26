import { Form, Select, Radio, DatePicker, Input, Button, Row, Col, Space, InputNumber } from 'antd';
import { useFetch } from '../../hooks';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';
import '../../index.css'
import { useNotification } from '../../hooks/index'
import AddMoreTag from '../../components/AddMoreTag';
import Item from 'antd/es/list/Item';

const { Option } = Select;

function AddComment() {

    const [commentEntryForm] = Form.useForm();
    const [url, setUrl] = useState('/commentHeading/getAllRecords');
    const { data, loading, error } = useFetch(url, true);
    const [auditUnits, setAuditUnits] = useState([]);
    const [auditUnit, setAuditUnit] = useState('');

    const [headList, setHeadList] = useState([]);
    const [head, setHead] = useState(null);
    const [subhead1, setSubHead1] = useState(null);
    const [subhead2, setSubHead2] = useState(null);
    const [subhead3, setSubHead3] = useState(null);
    const [subhead1List, setSubhead1List] = useState([]);
    const [subhead2List, setSubhead2List] = useState([]);
    const [subhead3List, setSubhead3List] = useState([]);
    const [standardCommentList, setStandardCommentList] = useState([]);
    const [nonCompliances, setNonCompliances] = useState([]);


    useEffect(() => {
        console.log(data)
        if (error) {
            return
        }

        if (data) {
            console.log(data)
            const units = Array.from(new Set(data.headingList.map((item) => item.auditUnit)))
            const nonCompliances = Array.from(new Set(data.headingList.map((item) => item.nonComplianceTo)))
            setNonCompliances(nonCompliances)
            setAuditUnits(units)
        }

    }, [data, error, loading]);

    useEffect(()=>{
        if (data){

          commentEntryForm.setFieldsValue({
                head: null,
                subHead1: null,
                subHead2: null,
                subHead3: null
            })
            
                
                setSubhead1List([])
                setSubhead2List([])
                setSubhead3List([])
            

            const heads =  Array.from(new Set(data.headingList.filter(item => item.auditUnit === auditUnit).map((item) => item.head)))
            setHeadList(heads)
            console.log("heads:::"+headList)
           
        }
    }, [auditUnit])

    useEffect(()=>{
        if (data){
            commentEntryForm.setFieldsValue({
                subHead1: null,
                subHead2: null,
                subHead3: null
            })
            setSubhead1List([])
            setSubhead2List([])
            setSubhead3List([])
            const subHead1s = Array.from(new Set(data.headingList.filter(item => item.auditUnit === auditUnit &&  item.head === head).map((item) => item.subHead1)))
            setSubhead1List(subHead1s)
        }
    },[head])


    useEffect(()=>{
        if (data){
                commentEntryForm.setFieldsValue({
                    subHead2: null,
                    subHead3: null
                })
                setSubhead2List([])
                setSubhead3List([])
                const subHead2s = Array.from(new Set(data.headingList.filter(item => item.auditUnit === auditUnit && item.head === head && item.subHead1 === subhead1 ).map((item) => item.subHead2)))
                setSubhead2List(subHead2s)
            
        }
    }, [ subhead1])

    useEffect(()=>{
        if (data){
                commentEntryForm.setFieldsValue({
                    subHead3: null
                })
                setSubhead3List([])
                const subHead3s = Array.from(new Set(data.headingList.filter(item => item.auditUnit === auditUnit && item.head === head && item.subHead1 === subhead1 && item.subHead2 === subhead2 ).map((item) => item.subHead3)))
                alert(subHead3s.length)
                setSubhead3List(subHead3s)
            
        }
    }, [subhead2])

    useEffect(()=>{
        if (data){
                
                setStandardCommentList([])
                const comments = Array.from(new Set(data.headingList.filter(item => item.auditUnit === auditUnit && item.head === head && item.subHead1 === subhead1 && item.subHead2 === subhead2 && item.subHead3 === subhead3 ).map((item) => item.standardComment)))
                

                setStandardCommentList(comments)
            
        }
    }, [subhead3])



    const onFinish = (values) => {

        console.log('Form values:', values);
        // alert(values.onsiteAuditPeriod)

    };



    const content =

        <div style={{ height: '100%', margin: '12px' }}>
            <Form form={commentEntryForm} onFinish={onFinish} layout='vertical' >
                <h2>Add comment</h2>
                <Row gutter={20} >

                    <Col span={6}>

                        <Form.Item name="auditUnit" label="Audit Unit" rules={[{ required: true }]}>
                            <Select onChange={(e)=>setAuditUnit(e)} placeholder="Select audit unit" >
                                {auditUnits.map((unit) => (
                                    <Option key={unit} value={unit}>{unit}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="head" label="Head" rules={[{ required: true }]}>
                            <Select onChange={(e)=>setHead(e)} placeholder="Select Head" >
                                {headList.map((head) => (
                                    <Option key={head} value={head}>{head}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>


                    <Col span={6}>

                        <Form.Item name="subHead1" label="Subhead 1" rules={[{ required: true }]}>
                            <Select onChange={(e)=>setSubHead1(e)} placeholder="Select Subhead 1" >
                            {subhead1List.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}


                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="subHead2" label="Subhead 2" rules={[{ required: true }]}>
                            <Select onChange={(e)=>setSubHead2(e)}  placeholder="Select Subhead 2" >
                            { subhead2List.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>


                </Row>


                <Row gutter={20} >

                    <Col span={6}>

                        <Form.Item name="subHead3" label="Subhead 3" rules={[{ required: true }]}>
                            <Select onChange={(e)=>setSubHead3(e)} placeholder="Select Subhead 3" >
                            { subhead3List.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="standardComment" label="Standard Comment" rules={[{ required: true }]}>
                            <Select placeholder="Select Standard Comment" >


                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="riskgrade" label="Risk Grade" rules={[{ required: true }]}>
                            <Input disabled placeholder="Risk Grade" >


                            </Input>
                        </Form.Item>
                    </Col>

                    <Col span={6}>

                        <Form.Item name="nonCompliance" label="Non Compliance" rules={[{ required: true }]}>
                            <Select placeholder="Select Non Compliance" >
                            { nonCompliances.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}


                            </Select>
                        </Form.Item>
                    </Col>


                </Row>

                <Row gutter={20} >
                    <Col span={6}>

                        <Form.Item name="commentSpecialMark" label="Special Markings" rules={[{ required: true }]}>
                            <Select  mode="multiple"  placeholder="Select Special Markings" >
                                <Option key={1}>Special Marking 1</Option>
                                <Option key={2}>Special Marking 2</Option>
                                <Option key={3}>Special Marking 3</Option>


                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>

                        <Form.Item name="refPolicy" label="Ref. Policy/Directive" rules={[{ required: true }]}>
                            <Input placeholder="Please enter..." >


                            </Input>
                        </Form.Item>
                    </Col>

                </Row>

                <Form.Item style={{marginTop: "20px"}}>
            <Button type="primary" htmlType="submit">Submit</Button>
             </Form.Item>


            </Form>


        </div>

    return content
}

export default AddComment