import { setReport } from '../../redux/slices/ReportSlices';
import { useDispatch, useSelector } from 'react-redux';
import ReportServices from '../../redux/service/ReportServices';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Dropdown, Popconfirm, Space, Statistic, Table, Tag } from 'antd';
import EditReport from './popup/EditReport';


const ReportListCompont = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [id, setid] = useState()
  const resData = useSelector((state) => state.report.reports);
  console.log(dateRange);
  // get report list
  const handleGetReportList = () => {
    try {
      ReportServices.getAllReport(1,10,"id",true).then((res) => {
        dispatch(setReport(res.data));
        console.log("res", res.data);
      });
    } catch (error) {
      console.log("Error fetching report:", error);
    }
  };

  // const startDate = dateRange[0].format('YYYY-MM-DD');
  // const endDate = dateRange[1].format('YYYY-MM-DD');

  useEffect(()=>{
    handleGetReportList();
  },[])

  if (!resData) {
    // Handle the case where resData is undefined or null
    return <p>Loading...</p>;
  }
  // delete report
  const handleDelete = (record) => {
    ReportServices.deleteById(record).then((res) => {
      console.log(res)
    }).catch((e) => {

    })
  };
  //Edit 
  const handleEdit = (record) => {
    setIsOpenEdit(true)
    setid(record)
    console.log(record);
  }
  

  const columns = [
    {
      title: 'Lecture',
      dataIndex: 'lecture',
      key: 'lecture',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      render: (_, { room }) => (
          <>
              {room.map((tag) => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';

                  color = 'geekblue';

                  return (
                      <Tag color={color} key={tag}>
                          {tag.name.toUpperCase()}
                      </Tag>
                  );
              })}
          </>
      ),
  },   
    {
      title: 'Number of Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Report Date',
      dataIndex: 'reportDate',
      key: 'reportDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.key)}>Edit</a>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm>
        </Space>
      ),
    },
  ];
  const pagination = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
  };

  const data = resData.map((item) => ({
    key: item.id, // Assuming there's an 'id' property in your data
    lecture: item.user.firstName,
    subject: item.subject.name,
    shift: item.shift.name,
    student: item.studentNum,
    createDate: item.createDate,
    reportDate: item.reportDate,
    room: item.room,
    // Assuming 'action' property is available in your data
    action: item.action,
  }))

  const handleOk = () => {
    setIsOpenEdit(false)
    // Additional logic when modal is OK
  };

  const handleCancel = () => {
    setIsOpenEdit(false)
    // Additional logic when modal is canceled
  };
  

  return (

    <div>
      <div className='flex'>
        <DatePicker.RangePicker
          onChange={(dates) => setDateRange(dates)}
          style={{ marginBottom: '16px' }}
        />
        <div className='m-left'>
          {resData && (
            <Statistic
              title="Number of Records"
              value={resData.length + " " + "Report"}
              style={{ marginLeft: '16px' }}
            />
          )}
        </div>

      </div>
      <EditReport isOpen={isOpenEdit} onOk={handleOk} onCancel={handleCancel} reportId={id} />
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </div>
  )



}

export default ReportListCompont;
