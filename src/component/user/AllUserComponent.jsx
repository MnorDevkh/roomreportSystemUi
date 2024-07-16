import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../redux/service/UserService';
import { setAllUser } from '../../redux/slices/UserSlice';
import AddSubjectToUserComponent from './popup/AddSubjectToUserComponent';
import AddShiftToUserComponent from './popup/AddShiftToUserComponent';
import EditComponent from './popup/EditComponent';
import DeleteShiftFromUserPopup from './popup/DeleteShiftFromUserPopup';
import DeleteSubjectFromUserPopup from './popup/DeleteSubjectFromUserPopup';

const AllUserComponent = () => {
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState(null);
    const [isModalOpenSubject, setIsModalOpenSubject] = useState(false);
    const [isModalOpenShift, setIsModalOpenShift] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenShiftDelete, setIsModalOpenShiftDelete] = useState(false);
    const [isModalOpenSubjectDelete, setIsModalOpenSubjectDelete] = useState(false);
    
    const [filteredData, setFilteredData] = useState(null);
    const resData = useSelector((state) => state.user.allUser);
    const [userIdForShift, setUserIdForShift] = useState(null);
    const [userIdForDeletShift, setUserDeletIdForShift] = useState(null);
    const [userIdForDeletSubject, setuserIdForDeleteSubject] = useState(null);
    
    const [userIdForSubject, setUserIdFSubject] = useState(null);
    const [userId, setuserId] = useState(null)
    console.log("resData", resData);
    // get User
    const handleGetUser = () => {
        try {
            UserService.getAllUser().then((res) => {
                dispatch(setAllUser(res.data));
                console.log("res", res.data);
            });
        } catch (error) {
            console.log("Error fetching report:", error);
        }
    };
    // const handleFilteredData = () => {
    //     try {
    //         if (dateRange) {
    //             const startDate = dateRange[0].format('YYYY-MM-DD');
    //             const endDate = dateRange[1].format('YYYY-MM-DD');
    //             const filteredReports = resData.filter(
    //                 (item) => item.date >= startDate && item.date <= endDate
    //             );
    //             setFilteredData(filteredReports);
    //         } else {
    //             setFilteredData(null);
    //         }
    //     } catch (error) {
    //         console.log("Error filtering reports:", error);
    //     }
    // }

    useEffect(() => {
        handleGetUser();
    }, []);

    const displayData = dateRange ? filteredData : resData;


    // if (!displayData) {
    //     // Handle the case where resData is undefined or null
    //     return <p>Loading...</p>;
    // }


    // add model
    const handleCancel = () => {
        setIsModalOpenShift(false);
        setIsModalOpenSubject(false);
        setIsModalOpenShiftDelete(false)
        setIsModalOpenSubjectDelete(false)
      
    };
    const handleShiftClick = (userId) => {
        setIsModalOpenShift(true);
        setUserIdForShift(userId);
    };
    const handleDeleteShift = (userId) => {
        setIsModalOpenShiftDelete(true);
        setUserDeletIdForShift(userId)
        console.log("userId", userId)
    }
    const handleDeleteSubject = (userId) => {
        setIsModalOpenSubjectDelete(true);
        setuserIdForDeleteSubject(userId)
        console.log("userId", userId)
    }
    
    const handleEdit = (userId) => {
        console.log("userId", userId)
        setIsModalOpenEdit(true);
        setuserId(userId);
    };


    const handleSubjectClick = (userId) => {
        setIsModalOpenSubject(true);
        setUserIdFSubject(userId)
    };
    return (
        <div>
            <div className='flex'>
                <EditComponent isOpen={isModalOpenEdit} onCancel={handleCancel} userId={userId} />
                <AddSubjectToUserComponent isOpen={isModalOpenSubject} onCancel={handleCancel} userIdForSubject={userIdForSubject} />
                <AddShiftToUserComponent isOpen={isModalOpenShift} onCancel={handleCancel} userIdForShift={userIdForShift} />
                <DeleteShiftFromUserPopup isOpen={isModalOpenShiftDelete} onCancel={handleCancel} userIdForShift={userIdForDeletShift} />
                <DeleteSubjectFromUserPopup isOpen={isModalOpenSubjectDelete} onCancel={handleCancel} userIdForSubject={userIdForDeletSubject} />
                <div className='m-left'>
                    {displayData && (
                        <Statistic
                            title="Number of Records"
                            value={displayData.length + " " + "User"}
                            style={{ marginLeft: '16px' }}
                        />
                    )}
                </div>

            </div>
            {/* <Table columns={columns} dataSource={data} pagination={pagination} /> */}
            <Row gutter={16}>
                {displayData?.map((item) => (
                    <Col key={item.id} span={12}>
                        <Card 
                        title={item.lastName} 
                        bordered={false} 
                        style={{ marginBottom: 16 }}
                        extra={
                        <div onClick={()=>handleEdit(item.id)}>Edit</div>}

                        >

                            <p className='p-2'>Full Name: {item.firstName} {item.lastName}</p>
                            <p className='p-2'>Email: {item.email}</p>
                            <p className='p-2'>Role: {item.role}</p>

                            <Row gutter={32}>
                                <Col key={item.id} span={12}>
                                    <Card title="Shift" bordered={false} style={{ marginBottom: 8 }}>
                                        {item.shift.map((shift) => (
                                            <p key={shift.id}>{shift.name}</p>
                                        ))}
                                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => handleShiftClick(item.id)} style={{ marginRight: 8, color: '#1890ff' }}>Add</Button>
                                            <Button onClick={() => handleDeleteShift(item.id)} style={{ color: '#ff4d4f' }}>Delete</Button>
                                        </div> */}
                                    </Card>
                                </Col>
                                <Col key={item.id} span={12}>
                                    <Card title="Subject" bordered={false}>
                                        {item.subject.map((subject) => (
                                            <p key={subject.id}>{subject.name}</p>
                                        ))}
                                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => handleSubjectClick(item.id)} style={{ marginRight: 8, color: '#1890ff' }}>Add</Button>
                                            <Button onClick={() => handleDeleteSubject(item.id)} style={{ color: '#ff4d4f' }}>Delete</Button>
                                        </div> */}
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default AllUserComponent;
