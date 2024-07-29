import React, { useEffect } from 'react';
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
    const [form] = Form.useForm();
    const values = useSelector((state) => state.report.reportById);
    const roomOptions = useSelector((state) => state.room.rooms);
    const subjectOptions = useSelector((state) => state.subject.currentUserSubjects);
    const shiftOptions = useSelector((state) => state.shift.currenShifts);

    useEffect(() => {
        if (reportId) {
            const fetchData = async () => {
                try {
                    const reportResponse = await ReportServices.getReportById(reportId);
                    dispatch(setReportById(reportResponse.data));
                    
                    await Promise.all([
                        RoomService.getAllRoom().then(res => dispatch(setRoom(res.data.data))),
                        ShiftService.getCurrenShift(1, 10, "id", false).then(res => dispatch(setCurrenShifts(res.data.data))),
                        SubjectService.getAllCurrentSubject().then(res => dispatch(setCurrentSubject(res.data.data))),
                    ]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
    }, [reportId, dispatch]);

    useEffect(() => {
        if (values) {
            form.setFieldsValue({
                subject: values.subject?.id,
                room: values.room?.map(room => room.id),
                shift: values.shift?.id,
                studentNum: values.studentNum,
                date: values.reportDate, // Ensure this matches the data key
            });
        }
    }, [values, form]);

    const handleSubmit = async () => {
        try {
            const apiData = {
                subjectId: form.getFieldValue('subject'),
                roomIds: form.getFieldValue('room'),
                shiftId: form.getFieldValue('shift'),
                date: form.getFieldValue('date'),
                studentNum: form.getFieldValue('studentNum'),
            };

            await ReportServices.updateById(reportId, apiData);
            message.success('Report updated');
            handleOk(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating report:', error);
            message.error('Error updating report');
        }
    };

    const handleOk = () => {
        onOk(); // Call onOk passed as prop
    };

    const handleCancel = () => {
        onCancel(); // Call onCancel passed as prop
    };

    return (
        <Modal title="Edit Report" visible={isOpen} onOk={handleSubmit} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
                <Form.Item
                    name="subject"
                    label="Select Subject"
                    rules={[{ required: true, message: 'Subject is required' }]}
                >
                    <Select placeholder="Select subject">
                        {subjectOptions?.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="room"
                    label="Select Room"
                    rules={[{ required: true, message: 'Room is required' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select room"
                    >
                        {roomOptions?.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="shift"
                    label="Select Shift"
                    rules={[{ required: true, message: 'Shift is required' }]}
                >
                    <Select placeholder="Select shift">
                        {shiftOptions?.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="studentNum"
                    label="Number of Students"
                    rules={[{ required: true, message: 'Number of students is required' }]}
                >
                    <Input type="text" placeholder="Number of students" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date"
                >
                    <Input type="date" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditReport;
