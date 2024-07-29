import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, message } from 'antd';
import SubjectService from '../../redux/service/SubjectSevice';
import { useParams } from 'react-router-dom';
import UserService from '../../redux/service/UserService';
import ShiftService from '../../redux/service/ShiftService';

const CheckboxGroup = Checkbox.Group;

const EditUserComponent = () => {
    const { userId } = useParams();
    const [currentSubject, setCurrentSubject] = useState([]);
    const [allSubject, setAllSubject] = useState([]);
    const [currentShift, setCurrentShift] = useState([]);
    const [allShift, setAllShift] = useState([]);

    useEffect(() => {
        if (userId) {
            handleGetSubject();
            handleGetShift();
        }
    }, [userId]);

    const handleGetSubject = async () => {
        try {
            const res = await SubjectService.getSubjectByUser(userId);
            const currentSubjectData = res.data.data;
            const currentSubjectNames = currentSubjectData.map(subject => subject.name);
            setCurrentSubject(currentSubjectNames);

            const allRes = await SubjectService.getAllSubject();
            const allSubjectData = allRes.data.data;
            setAllSubject(allSubjectData);
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    const handleGetShift = async () => {
        try {
            const res = await ShiftService.getShiftByUser(userId);
            const currentShiftData = res.data.data;
            const currentShiftNames = currentShiftData.map(shift => shift.name);
            setCurrentShift(currentShiftNames);

            const allRes = await ShiftService.getAllShift();
            const allShiftData = allRes.data.data;
            setAllShift(allShiftData);
        } catch (error) {
            console.error("Error fetching shifts", error);
        }
    };

    const onSubjectChange = (list) => {
        setCurrentSubject(list);
    };

    const onShiftChange = (list) => {
        setCurrentShift(list);
    };

    const onCheckAllSubjectChange = (e) => {
        setCurrentSubject(e.target.checked ? allSubject.map(subject => subject.name) : []);
    };

    const onCheckAllShiftChange = (e) => {
        setCurrentShift(e.target.checked ? allShift.map(shift => shift.name) : []);
    };

    const handleSubmit = async () => {
        try {
            const checkedSubjectIds = allSubject
                .filter(subject => currentSubject.includes(subject.name))
                .map(subject => subject.id);

            const checkedShiftIds = allShift
                .filter(shift => currentShift.includes(shift.name))
                .map(shift => shift.id);

            const data = {
                subjectsId: checkedSubjectIds,
                shiftId: checkedShiftIds,
            };
            await UserService.updateById(userId, data);
            message.success("Updated user successfully");
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    const subjectCheckAll = allSubject.length > 0 && currentSubject.length === allSubject.length;
    const subjectIndeterminate = currentSubject.length > 0 && currentSubject.length < allSubject.length;

    const shiftCheckAll = allShift.length > 0 && currentShift.length === allShift.length;
    const shiftIndeterminate = currentShift.length > 0 && currentShift.length < allShift.length;

    return (
        <>
            <Divider />
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Checkbox indeterminate={shiftIndeterminate} onChange={onCheckAllShiftChange} checked={shiftCheckAll}>
                        Check all shifts
                    </Checkbox>
                    <p>Shift</p>
                    <CheckboxGroup
                        options={allShift.map(shift => ({
                            label: shift.name,
                            value: shift.name
                        }))}
                        value={currentShift}
                        onChange={onShiftChange}
                    />
                </div>
                <div>
                    <Checkbox indeterminate={subjectIndeterminate} onChange={onCheckAllSubjectChange} checked={subjectCheckAll}>
                        Check all subjects
                    </Checkbox>
                    <p>Subject</p>
                    <CheckboxGroup
                        options={allSubject.map(subject => ({
                            label: subject.name,
                            value: subject.name
                        }))}
                        value={currentSubject}
                        onChange={onSubjectChange}
                    />
                </div>
            </div>
            <div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            <Divider />
        </>
    );
};

export default EditUserComponent;
