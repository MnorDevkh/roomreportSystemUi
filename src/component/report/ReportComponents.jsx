import React, { useEffect, useState } from 'react';
import RoomService from '../../redux/service/RoomService';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../redux/slices/RoomSlices';
import TeacherServices from '../../redux/service/TeacherServices';
import { setLecturer } from '../../redux/slices/TeacherSlices';
import ShiftService from '../../redux/service/ShiftService';
import { setShift } from '../../redux/slices/ShiftSlices';
import ReportServices from '../../redux/service/ReportServices';
import { Form, Input, Select } from 'antd';
import { Button } from 'flowbite-react';
import { NavLink } from 'react-router-dom';



const ReportComponents = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const roomOptions = useSelector((state) => state.room.rooms)
    const roomOption = roomOptions.map(item => ({
        value: item.id,
        label: item.name,
    }));
    const teacherOptions = useSelector((state) => state.lecturer.lecturers)
    const teacherOption = teacherOptions.map(item => ({
        value: item.id,
        label: item.name,
    }));

    const shiftOptions = useSelector((state) => state.shift.shifts)
    const shiftOption = shiftOptions.map(item => ({
        value: item.id,
        label: item.name,
    }));
    // get all room
    const handleGetRoom = () => {
        RoomService.getAllRoom().then(res => {
            // console.log(res.data.payload)
            dispatch(setRoom(res.data.payload));
        });
    }
    // get all teacher
    const handleGetLecturer = () => {
        TeacherServices.getAllTeachers().then(res => {
            dispatch(setLecturer(res.data.payload))
            console.log(res)
        })
    }
    //get all shift
    const handleGetShift = () => {
        ShiftService.getAllShift().then(res => {
            dispatch(setShift(res.data.payload))
        })
    }

    useEffect(() => {
        handleGetLecturer();
        handleGetRoom();
        handleGetShift();
    }, [])
    
    const [selectedTeacher, setSelectedTeacher] = useState('');
const [selectedRoom, setSelectedRoom] = useState('');
const [selectedShift, setSelectedShift] = useState('');
const [selectedStudentNum, setSelectedStudentNum] = useState('');
const [selectedDate, setSelectedDate] = useState('');

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'teacher':
                setSelectedTeacher(value);
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
    const handleSubmit = (e) => {
        e.preventDefault();

        const apiData = {
            roomId: selectedRoom,
            teacherId: selectedTeacher,
            shiftId: selectedShift,
            date: selectedDate,
            studentNum: selectedStudentNum,
        };
        ReportServices.postReport(apiData).then((res) => {
            // Handle the response from the API if needed
            console.log('API Response:', res.data);
            // history.push('/reportlist');
            setSelectedTeacher('');
            setSelectedRoom('');
            setSelectedShift('');
            setSelectedStudentNum('');
            setSelectedDate('');
        });
        console.log('Form data submitted:', apiData);

    };

    // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    return (
        <>
            <div className=''>
                <div className='pt-5 px-5 flex justify-end'>
                    <Button>
                        <NavLink to="/login">
                            LOGIN
                        </NavLink>
                    </Button>
                </div>
                {/* <Slidebaes/> */}
                <div className="flex justify-center w-full">
                    <div>
                        <div className='my-5'>
                            <p className="text-3xl">Report</p>
                        </div>
                        <form className="report-form w-96" onSubmit={handleSubmit}>
                            <Form.Item
                                name="select1"
                                label="Select"
                                hasFeedback
                                rules={[{ required: true, message: 'select is required' }]}
                            >
                                <Select
                                    mode="single"
                                    placeholder="Select teacher"
                                    value={selectedTeacher}
                                    onChange={(value) => handleInputChange('teacher', value)}
                                    showSearch

                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    options={teacherOption}
                                />
                            </Form.Item>

                            <Form.Item
                                name="select2"
                                label="Select"
                                hasFeedback
                                rules={[{ required: true, message: 'select is required' }]}
                            >
                                <Select
                                    mode="single"
                                    placeholder="Select Room"
                                    value={selectedRoom}
                                    onChange={(value) => handleInputChange('room', value)}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    options={roomOption}
                                />
                            </Form.Item>


                            <Form.Item
                                name="select3"
                                label="Select"
                                hasFeedback
                                rules={[{ required: true, message: 'select is required' }]}
                            >
                                <Select
                                    mode="single"
                                    placeholder="Select shift"
                                    value={selectedShift}
                                    onChange={(value) => handleInputChange('shift', value)}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    options={shiftOption}
                                />
                            </Form.Item>


                            <div className='flex'>
                                <label for="studentNum" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white m-auto  items-center pr-6">Input</label>
                                <input type="text" id="studentNum" name="studentNum" value={selectedStudentNum} onChange={(e) => handleInputChange('studentNum', e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number of student" required />
                            </div>
                            <div className='pt-5 flex'>
                                <label htmlFor="date" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white m-auto items-center pr-6">Input</label>
                                <input type="date" id="date" name="date" value={selectedDate} onChange={(e) => handleInputChange('date', e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number of student" required />
                            </div>
                            <div className='pt-5'>
                                <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ReportComponents;
