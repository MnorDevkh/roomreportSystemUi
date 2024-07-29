import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ShiftService from '../../redux/service/ShiftService';
import { setAllShifts, setCurrenShifts } from '../../redux/slices/ShiftSlices';
import AddShift from './popup/AddShift';
import Edit from './popup/Edit';
const AllShiftLishComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.shift.allShifts)
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [id, setId] = useState()
    // get all shift
    const handleGetShift = () => {
        ShiftService.getAllShift().then(res => {
            dispatch(setAllShifts(res.data.data))
        })
    }
    useEffect(() => {
        handleGetShift();
    }, [])
    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };


    const handleEdit = (id) => {
        setIsOpenEdit(true);
        setId(id)
        handleGetShift();
        
    }
    const handleDelete = (id) => {
        console.log(id)
        ShiftService.deleteById(id).then((res)=>{
            handleGetShift();
        })
    }

    const columns = [
        {
            title: 'Shift',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 1,
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: {
                compare: (a, b) => a.description.localeCompare(b.description),
                multiple: 2,
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: {
                compare: (a, b) => new Date(a.date) - new Date(b.date),
                multiple: 3,
            },
        },
        {
        
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm>
                </Space>
            ),
        },
    ];
    const data = resData.slice().reverse().map((item, index) => ({
        key: item.id,
        name: item.name,
        description: item.description,
        date: item.date,
        
    }
    ));

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    // add model
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false);
        handleGetShift();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false)
    };
    return (
        <div>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
                Add New Shift
            </Button>
            <Edit isOpen={isOpenEdit} onOk={handleOk} onCancel={handleCancel} id={id} />
            <AddShift isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={pagination} />
        </div>
    );
}

export default AllShiftLishComponent;
