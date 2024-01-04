import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import AuthServices from '../../redux/service/AuthService';
const LoginComponent = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        AuthServices.postLogin(values).then((res)=>{
            console.log('API Response:', res.data);
            localStorage.setItem("token", res.data.token)
        })
    }; 
    return (
    <div className='flex justify-center h-[100vh] items-center'>
        <div className='bg-gray-200 p-10 rounded-md w-[70vh]'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                            
                   or <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <NavLink to="/login register now!">
                            register now
                        </NavLink>
                </Form.Item>
            </Form>
        </div>
    </div>
    );
}

export default LoginComponent;
