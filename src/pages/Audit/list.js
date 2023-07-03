
import { useApiPost } from '../../hooks';
import { useEffect, useState } from 'react';

import { Table, Skeleton, Space, Tag, Button } from 'antd';

import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function ListAudit() {

    const { userInfo } = useSelector((state) => state.user)

    const payload = {createdBy:userInfo.domainName}

    const navigate = useNavigate();
    const [ isLoading, response, postError ] = useApiPost('/auditMaster/getAllRecord', payload);


    const navigateToDetailPage = props => { 
      navigate('/auditDetails/'+`${props.id}`, {state: props })
    }

    const getDateFromString = str => {
        const [date,time] = str.split("T");      
        return date;
      };

      const getStatusFromCode = str => {
        var status = ""
        if (str === 'E') {
          status = "ENTERED"
         }            
        return status;
      };
 

    const columns = [
        {
          title: 'Fiscal Year',
          dataIndex: 'fiscalYear',
          key: 'fiscalYear'
          
        },
        {
          title: 'Audit Type',
          dataIndex: 'typeOfAudit',
          key: 'typeOfAudit',
        },
        {
          title: 'Audit Branch/Department',
          dataIndex: 'auditUnitDesc',
          key: 'auditUnitDesc',
        },
        {
            title: 'Audit Status',
            dataIndex: 'auditStatus',
            key: 'auditStatus',
            render: (text) => <Tag color= {text === 'entered' ? 'geekblue' : 'green' } key={text}>
            {getStatusFromCode(text).toUpperCase()}
          </Tag> 
          },
          {
            title: 'Created Date',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render:  (text) => getDateFromString(text) ,
          },
          {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
          },
        
        {
          title: 'Action',
          key: 'action',
          render: (record) =>( <Space size="middle"> <Button type="primary" icon = {<EditFilled/>}
              onClick={()=> navigateToDetailPage(record) }></Button>   
              <Button danger icon={<DeleteFilled />}
              onClick={()=> console.log()}></Button> 
              </Space>           
              )
        },
      ];


    const [auditRecords, setAuditRecords] = useState([])



    useEffect(() => {
    
      
            if (postError) {
                if (postError.request) {
                  console.log(postError)
                }
                else if (postError.response) {
                  console.log(postError)
                }
                return
            }

            if (response) {
                 setAuditRecords( response.auditMasterListAll);
            }
  
    }, [response, postError]);


    // useEffect(() => {

    //   console.log(auditRecords)
     
    // }, [auditRecords]);




    const content = 
    <div style={{ height: '100%', margin: '12px' }}>
                <h2>Audit Lists</h2>

          <Table columns={columns} dataSource={auditRecords} size='large'   >

      </Table>

    </div>
    return (content);
}

export default ListAudit;