import { Button, Form, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import UserService from '../../../redux/service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import ShiftService from '../../../redux/service/ShiftService';
import { setAllShifts } from '../../../redux/slices/ShiftSlices';
import { setAllUser, setUserById } from '../../../redux/slices/UserSlice';


const DeleteShiftFromUserPopup = ({ isOpen, onCancel, userIdForShift }) => {
    const dispatch = useDispatch();
    const [isModalOpenSubject, setIsModalOpenSubject] = useState(false);

    const UserData = useSelector((state) => state.user.userById);
    const ShiftData = useSelector((state) => state.shift.allShifts)

    console.log(UserData)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCancel = () => {
        setIsModalOpenSubject(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };
    // handle get user
    const handleGetUser = () => {
        UserService.getUserById(userIdForShift).then((res) => {
            dispatch(setUserById(res.data.data));
        })
    }


    // get all shift
    const handleGetShift = () => {
        ShiftService.getAllShift().then(res => {
            console.log("123res", res.data.data)
            dispatch(setAllShifts(res.data.data))
        })
    }
    useEffect(() => {
        handleGetShift();
        handleGetUser()
    }, [])
    const onFinish = (values) => {
    
       const shiftId = values.shift
       const userId = userIdForShift
   
        UserService.deleteShiftFromUser(userId,shiftId).then((res) => {
            onCancel();
            message.success('User already delete');
        }).catch((error) => {
            if (error.response && error.response.status === 409) {
                // HTTP 409 indicates a conflict
                message.error('Conflict: User already associated with this shift');
            } else {
                console.error('Error:', error.message);
                // Handle other types of errors here
            }
        })

    };
    const initialValue = {

    }
    useEffect(() => {

    }, [])
    return (
        <div>
            <Modal title="Delete Shift from User" visible={isOpen} onCancel={handleCancel} footer={null}>
                <Form
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
                        name="shift"
                        initialValue={initialValue}
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        {/* <Select>
                            {UserData.slice().reverse().map((user) => (
                                // Use parentheses instead of curly braces to implicitly return JSX
                                user.shift.map((shiftit) => (
                                    <Select.Option key={shiftit.id} value={shiftit.id}>
                                        {shiftit.name}
                                    </Select.Option>
                                ))
                            ))}
                        </Select> */}


                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="default" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
}

export default DeleteShiftFromUserPopup;
