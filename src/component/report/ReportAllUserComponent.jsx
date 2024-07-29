import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import AddReport from './popup/AddReport';
import EditReport from './popup/EditReport';
import ReportServices from '../../redux/service/ReportServices';
import { setReportCurrenUser } from '../../redux/slices/ReportSlices';

const ReportAllUserComponent = () => {
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.report.reportCurrenUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);

    const handleGetReportList = () => {
        try {
            ReportServices.getReportCurrentUser(1, 10, "id", true).then((res) => {
                dispatch(setReportCurrenUser(res.data));
            });
        } catch (error) {
            console.error("Error fetching report:", error);
        }
    };

    useEffect(() => {
        handleGetReportList();
    }, []);

    const handleDelete = async (record) => {
        try {
            await ReportServices.deleteById(record);
            message.success('Report deleted');
            handleGetReportList();
        } catch (error) {
            message.error('Error deleting report');
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false);
        handleGetReportList();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsOpenEdit(false);
    };

    const handleEdit = (record) => {
        setIsOpenEdit(true);
        setSelectedReportId(record.key);
    };

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
                    {room.map((tag) => (
                        <Tag color="geekblue" key={tag.id}>
                            {tag.name.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Number of Student',
            dataIndex: 'student',
            key: 'student',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const pagination = {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    };

    const data = resData
        ?.filter(item => item !== undefined)
        .map((item) => ({
            key: item.id,
            lecture: item.user.firstName,
            subject: item.subject.name,
            shift: item.shift.name,
            student: item.studentNum,
            date: item.date,
            room: item.room,
        }));

    return (
        <div>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
                Add New Report
            </Button>
            <AddReport isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <EditReport isOpen={isOpenEdit} onOk={handleOk} onCancel={handleCancel} reportId={selectedReportId} />
            <Table columns={columns} dataSource={data} pagination={pagination} />
        </div>
    );
};

export default ReportAllUserComponent;
