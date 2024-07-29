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
import { useNavigate } from 'react-router-dom';

const AllUserComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const displayData = useSelector((state) => state.user.allUser);
    const handleGetUser = () => {
        try {
            UserService.getAllUser().then((res) => {
                dispatch(setAllUser(res.data));
            });
        } catch (error) {
            console.log("Error fetching report:", error);
        }
    };


    useEffect(() => {
        handleGetUser();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    return (
        <div>
            <div className='flex'>
            
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
