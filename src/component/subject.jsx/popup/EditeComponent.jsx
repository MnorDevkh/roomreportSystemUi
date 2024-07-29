import { Button, Form, Input, Layout, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import SubjectService from '../../../redux/service/SubjectSevice';

const EditeComponent = ({ isOpen, onOk, onCancel, id }) => {
    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(()=>{
        if (id) {
        SubjectService.getById(id).then((res) => {
            form.setFieldsValue(res.data);
        }).catch((error) => {
            console.error("Error fetching shift details:", error);
        });
    }
}, [id, form]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const onFinish = (values) => {
        console.log(values, "1233");
        SubjectService.updateById(id, values).then((res) => {
            console.log(">>", res);
            if (onOk) {
                onOk();
            }
        })
        .catch((error) => {

        });
    };

    return (
        <div>
            <Modal title="Edit Subject" visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Shift"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Shift name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EditeComponent;
