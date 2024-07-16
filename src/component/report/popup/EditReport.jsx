import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Button, message } from 'antd';
import RoomService from '../../../redux/service/RoomService';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../../redux/slices/RoomSlices';
import ShiftService from '../../../redux/service/ShiftService';
import { setCurrenShifts } from '../../../redux/slices/ShiftSlices';
import ReportServices from '../../../redux/service/ReportServices';
import { setReportById } from '../../../redux/slices/ReportSlices';
import { setCurrentSubject } from '../../../redux/slices/SubjectSlices';
import SubjectService from '../../../redux/service/SubjectSevice';

const EditReport = ({ isOpen, onOk, onCancel, reportId }) => {
    const dispatch = useDispatch();
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    // Define state variables and their setters
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedStudentNum, setSelectedStudentNum] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // Fetch report data by ID
    const handleGetReportById = () => {
        ReportServices.getReportById(reportId)
            .then((res) => {
                dispatch(setReportById(res.data));
                console.log("res", res);
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    // Fetch room data
    const handleGetRoom = () => {
        RoomService.getAllRoom().then(res => {
            console.log(res.data.data);
            dispatch(setRoom(res.data.data));
        });
    };

    // Fetch shift data
    const handleGetShift = () => {
        ShiftService.getCurrenShift(1, 10, "id", false)
            .then(res => {
                console.log(res.data.data);
                dispatch(setCurrenShifts(res.data.data));
            })
            .catch((e) => {
                console.log("Error fetching shifts:", e);
            });
    };

    // Fetch subject data
    const handleGetSubject = () => {
        SubjectService.getAllCurrentSubject().then(res => {
            console.log("getAllSubject", res.data.data);
            dispatch(setCurrentSubject(res.data.data));
        });
    };

    const roomOptions = useSelector((state) => state.room.rooms);
    const roomOption = roomOptions.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const subjectOptions = useSelector((state) => state.subject.currentUserSubjects);
    const subjectOption = subjectOptions?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const shiftOptions = useSelector((state) => state.shift.currenShifts)?.map((shift) => ({
        value: shift.id,
        label: shift.name,
    })) || [];
    
    const values = useSelector((state) => state.report.reportById);

    // Effect to fetch data on component mount or when reportId changes
    useEffect(() => {
        handleGetReportById();
        handleGetRoom();
        handleGetShift();
        handleGetSubject();
    }, [reportId]);

    // Effect to set selected values when reportById changes
    useEffect(() => {
        if (values) {
            setSelectedSubject(values.subject);
            setSelectedRoom(values.roomId);
            setSelectedShift(values.shiftId);
            setSelectedStudentNum(values.studentNum);
            setSelectedDate(values.date);
        }
    }, [values]);

    const handleSubmit = async () => {
        const apiData = {
            subjectId: selectedSubject,
            roomIds: selectedRoom,
            shiftId: selectedShift,
            date: selectedDate,
            studentNum: selectedStudentNum,
        };

        try {
            const res = await ReportServices.updateById(reportId , apiData);
            message.success('Report updated');
            dispatch(setReportById(res)); // Assuming res contains updated report data
            handleOk();
        } catch (error) {
            console.error('Error updating report:', error);
            // Handle error scenario
        }
    };
    

    const handleOk = () => {
        setIsOpenEdit(false);
        if (onOk) {
            onOk();
        }
    };

    const handleCancel = () => {
        setIsOpenEdit(false);
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <Modal title="Edit Report" visible={isOpen} onOk={handleSubmit} onCancel={handleCancel}>
         {/* <Modal title="Edit Report" visible={isOpen} > */}
            <Form>
                <Form.Item
                    name="select1"
                    label="Select Subject"
                    hasFeedback
                    rules={[{ required: true, message: 'Subject is required' }]}
                >
                    <Select
                        placeholder="Select subject"
                        options={subjectOption}
                    />
                </Form.Item>
                <Form.Item
                    name="select2"
                    label="Select Room"
                    hasFeedback
                    rules={[{ required: true, message: 'Room is required' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select room"
                        options={roomOption}
                    />
                </Form.Item>
                <Form.Item
                    name="select3"
                    label="Select Shift"
                    hasFeedback
                    rules={[{ required: true, message: 'Shift is required' }]}
                >
                    <Select
                        placeholder="Select shift"
                        options={shiftOptions}
                    />
                </Form.Item>
                <Form.Item
                    name="studentNum"
                    label="Number of Students"
                    hasFeedback
                    rules={[{ required: true, message: 'Number of students is required' }]}
                >
                    <Input type="text" placeholder="Number of students" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date"
                    hasFeedback
                >
                    <Input type="date" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditReport;
