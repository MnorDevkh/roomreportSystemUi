import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import ShiftService from '../../../redux/service/ShiftService';

const Edit = ({ isOpen, onCancel, id, onOk }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            ShiftService.getShiftByid(id).then((res) => {
                form.setFieldsValue(res.data);
            }).catch((error) => {
                console.error("Error fetching shift details:", error);
            });
        }
    }, [id, form]);

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
    };

    const onFinish = (values) => {
        ShiftService.updateById(id, values).then((res) => {
            handleOk();
        }).catch((error) => {
            console.error("Error updating shift:", error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Edit Shift" visible={isOpen} onCancel={handleCancel} footer={null}>
            <Form
                form={form}
                name="editShift"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Shift"
                    name="name"
                    rules={[{ required: true, message: 'Please input the shift name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="default" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Edit;
