
import { useFetch } from '../../hooks';
import { useEffect, useState } from 'react';

import { Table, Skeleton  } from 'antd';


function ListAudit() {

    const [url, setUrl] = useState('auditMaster/getAllRecord');
    const { data, loading, error } = useFetch(url, true);


    const getDateFromString = str => {
        const [date,time] = str.split("T");
        
        return date;



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
            render:  (text) => <a>{text ==='E' ? 'Entered' : text}</a>,
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
          }
        
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
      ];


    const [auditRecords, setAuditRecords] = useState([])


    useEffect(() => {
     
      
            if (error) {

                if (error.request) {
                    alert(error.code)
                  
                }
                else if (error.response) {
                    alert(error.response)
                   
                }
                return
            }

            if (data ) {
                console.log(data)
                 setAuditRecords( data.auditMasterListAll);
            }
        

        
    }, [data, error, loading]);






    const content = <div style={{ height: '100%', margin: '12px' }}>
                <h2>Audit Lists</h2>

                <Table columns={columns} dataSource={auditRecords}></Table>


    </div>
    return (content);
}

export default ListAudit;