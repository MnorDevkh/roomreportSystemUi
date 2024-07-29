import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomService from '../../redux/service/RoomService';
import { setRoom } from '../../redux/slices/RoomSlices';
import AddRoom from './popup/AddRoom';
import EditRoomComponent from './popup/EditRoomComponent';
import { useNavigate } from 'react-router-dom';

const RoomComponent = () => {
    const [id, setId] = useState();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const resData = useSelector((state) => state.room.rooms);

    // Fetch all rooms
    const handleGetRoom = () => {
        RoomService.getAllRoom().then(res => {
            dispatch(setRoom(res.data.data));
        });
    };

    useEffect(() => {
        handleGetRoom();
    }, []);

    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };

    // Delete room
    const handleDelete = (record) => {
        RoomService.deleteById(record).then((res) => {
            dispatch(setRoom(resData.filter(room => room.id !== record)));
        });
    };

    // Edit room
    const handleEdit = (record) => {
        setId(record);
        setIsOpenEdit(true);
    };

    const columns = [
        {
            title: 'Room',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = resData.slice().reverse().map((item) => ({
        key: item.id,
        name: item.name,
        description: item.description,
        date: item.date,
        type: item.type,
        floor: item.floor,
        action: item.id,
    }));

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false);
        handleGetRoom();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false);
    };

    return (
        <div>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
                Add Room
            </Button>
            <AddRoom isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <EditRoomComponent isOpen={isOpenEdit} onOk={handleOk} onCancel={handleCancel} id={id}/>
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
        </div>
    );
}

export default RoomComponent;
