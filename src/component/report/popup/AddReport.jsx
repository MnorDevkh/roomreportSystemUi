import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import RoomService from '../../../redux/service/RoomService';
import { setRoom } from '../../../redux/slices/RoomSlices';
import ShiftService from '../../../redux/service/ShiftService';
import { setCurrenShifts } from '../../../redux/slices/ShiftSlices';
import ReportServices from '../../../redux/service/ReportServices';
import SubjectService from '../../../redux/service/SubjectSevice';
import { setCurrentSubject } from '../../../redux/slices/SubjectSlices';
import { addReport } from '../../../redux/slices/ReportSlices';

const AddReport = ({ isOpen, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const res = await RoomService.getAllRoom();
                dispatch(setRoom(res.data.data));
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        const fetchShiftData = async () => {
            try {
                const res = await ShiftService.getCurrenShift();
                dispatch(setCurrenShifts(res.data.data.payload));
            } catch (error) {
                console.error("Error fetching shifts:", error);
            }
        };

        const fetchSubjectData = async () => {
            try {
                const res = await SubjectService.getAllCurrentSubject();
                dispatch(setCurrentSubject(res.data.data.payload));
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchRoomData();
        fetchShiftData();
        fetchSubjectData();
    }, [dispatch]);

    const roomOptions = useSelector((state) => state.room.rooms);
    const subjectOptions = useSelector((state) => state.subject.currentUserSubjects);
    const shiftOptions = useSelector((state) => state.shift.currenShifts);

    const roomOption = roomOptions?.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const subjectOption = subjectOptions?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const shiftOption = shiftOptions?.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedStudentNum, setSelectedStudentNum] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'subject':
                setSelectedSubject(value);
                break;
            case 'room':
                setSelectedRoom(value);
                break;
            case 'shift':
                setSelectedShift(value);
                break;
            case 'studentNum':
                setSelectedStudentNum(value);
                break;
            case 'date':
                setSelectedDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (values) => {
        const apiData = {
            subjectId: values.select1,
            roomIds: values.select2,
            shiftId: values.select3,
            date: values.date,
            studentNum: values.studentNum,
        };

        try {
            const res = await ReportServices.postReport(apiData);
            message.success('Report created');
            dispatch(addReport(res.data)); // Dispatch the new report to the Redux store
            form.resetFields();
            handleOk();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                message.error('Report creation failed - Conflict');
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const handleOk = () => {
        form.resetFields();
        if (onOk) {
            onOk();
        }
    };

    const handleCancel = () => {
        form.resetFields();
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div>
            <Modal title="Add Report" visible={isOpen} onCancel={handleCancel} footer={null} className="w-96">
                <Form className="report-form w-96" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="select1"
                        label="Subject"
                        hasFeedback
                        rules={[{ required: true, message: 'Subject is required' }]}
                    >
                        <Select
                            placeholder="Select subject"
                            value={selectedSubject}
                            onChange={(value) => handleInputChange('subject', value)}
                            showSearch
                            filterOption={(input, option) =>
                                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: '100%' }}
                            options={subjectOption}
                        />
                    </Form.Item>

                    <Form.Item
                        name="select2"
                        label="Room"
                        hasFeedback
                        rules={[{ required: true, message: 'Room is required' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select room"
                            value={selectedRoom}
                            onChange={(value) => handleInputChange('room', value)}
                            showSearch
                            filterOption={(input, option) =>
                                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: '100%' }}
                            options={roomOption}
                        />
                    </Form.Item>

                    <Form.Item
                        name="select3"
                        label="Shift"
                        hasFeedback
                        rules={[{ required: true, message: 'Shift is required' }]}
                    >
                        <Select
                            placeholder="Select shift"
                            value={selectedShift}
                            onChange={(value) => handleInputChange('shift', value)}
                            showSearch
                            filterOption={(input, option) =>
                                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: '100%' }}
                            options={shiftOption}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Number of Students"
                        name="studentNum"
                        hasFeedback
                        rules={[{ required: true, message: 'Number of students is required' }]}
                    >
                        <Input
                            type="text"
                            value={selectedStudentNum}
                            onChange={(e) => handleInputChange('studentNum', e.target.value)}
                            placeholder="Number of students"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        hasFeedback
                        rules={[{ required: true, message: 'Date is required' }]}
                    >
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </Form.Item>

                    <div className='pt-5'>
                        <Button type="default" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default AddReport;
