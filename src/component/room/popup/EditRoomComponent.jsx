import { Button, Form, Input, message, Modal, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import RoomService from '../../../redux/service/RoomService';

const EditRoomComponent = ({ isOpen, onCancel, onOk, id }) => {
    const [form] = Form.useForm();
    const [roomDetails, setRoomDetails] = useState(null);
    useEffect(() => {
        if (id) {
            RoomService.getRoomById(id).then((res) => {
                setRoomDetails(res.data);
                form.setFieldsValue(res.data);
            }).catch((error) => {
            
            });
        }
    }, [id, form]);

    const handleCancel = () => {
        onCancel();
    };

    const handleOk = () => {
        onOk();
    };

    const onFinish = (values) => {
        RoomService.editRoom(id, values).then((res) => {
            message.success("Room updated successfully");
            handleOk();
        }).catch((error) => {
        
        });
    };

    const onFinishFailed = (errorInfo) => {

    };

    return (
        <>
            <Modal title="Edit Room" visible={isOpen} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="editRoom"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Room"
                        name="name"
                        rules={[{ required: true, message: 'Please input the room name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Floor"
                        name="floor"
                        rules={[{ required: true, message: 'Please select a floor!' }]}
                    >
                        <Select>
                            <Select.Option value="floor1">Floor 1</Select.Option>
                            <Select.Option value="floor2">Floor 2</Select.Option>
                            <Select.Option value="floor3">Floor 3</Select.Option>
                            <Select.Option value="floor4">Floor 4</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select a type!' }]}
                    >
                        <Select>
                            <Select.Option value="lab1">Lab 1</Select.Option>
                            <Select.Option value="Room">Room</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="default" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditRoomComponent;
