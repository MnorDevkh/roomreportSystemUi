
import { setReport } from '../../redux/slices/ReportSlices';
import { useDispatch, useSelector } from 'react-redux';
import ReportServices from '../../redux/service/ReportServices';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import { Button, Dropdown } from 'antd';
import Slidebaes from '../layout/Slidebaes';

const ReportListCompont = () => {
    const dispatch = useDispatch();
    const getAllReport = useSelector((state) => state.report.reports)
    console.log("getAllReport", getAllReport)
    //get report list
    const handleGetReportList = () => {
        try {
            ReportServices.getAllReport().then(res => {
                dispatch(setReport(res.data.payload))
                console.log(res.data.payload)
            })
        } catch (error) {
            console.error("Error fetching report:", error);
        }
    }

    useEffect(() => {
        handleGetReportList();
    }, []);


    return (
        <div className='flex w-full min-h-full'>
            <Slidebaes className="min-h-full"/>
            <div class="relative overflow-x-auto w-full">
                <div className='pl-5'>
                    <p className="text-3xl">All report</p>
                </div>
               <div className='pt-5'>
               <table class=" w-full  text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" class="py-3 pl-20">
                                Teacher
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Room
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Shift
                            </th>
                            <th scope="col" class="px-6 py-3">
                                date
                            </th>
                            <th scope="col" class="py-3">
                                Number of Student
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllReport.map((item) => (
                            <tr key={item.studentNum} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class=" py-4 pl-20 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.teacher.name}
                                </th>
                                <td class="px-6 py-4 ">
                                    {item.room.name}
                                </td>
                                <td class="px-6 py-4">
                                    {item.shift.name}
                                </td>
                                <td class="px-6 py-4">
                                    {item.date}
                                </td>
                                <td class=" py-4">
                                    {item.studentNum}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
            </div>
        </div>
    );
}

export default ReportListCompont;
