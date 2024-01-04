import React, { useEffect, useState } from 'react';
import Slidebaes from '../layout/Slidebaes';
import { useDispatch, useSelector } from 'react-redux';
import { setLecturer } from '../../redux/slices/TeacherSlices';
import TeacherServices from '../../redux/service/TeacherServices';

import { Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};
const LecturerList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.lecturer.lecturers)
    // get all teacher
    const handleGetLecturer = () => {
        TeacherServices.getAllTeachers().then(res => {
            dispatch(setLecturer(res.data.payload))
            console.log(res)
        })
    }
    useEffect(() => {
        handleGetLecturer();
    }, [])
    return (
        <div>
            <div className='flex'>
                <Slidebaes />
                <div>
                    <div>
                        <Table
                        
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LecturerList;
