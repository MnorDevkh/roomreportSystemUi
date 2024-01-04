import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Add new', 'sub1', <MailOutlined />, [
        getItem(
            <button>
                <NavLink
                    to="/"
                > add report
                </NavLink>
            </button>
            , '5'),
        getItem(<button>
            <NavLink
                to="/teacher"
            > add lecturer
            </NavLink>
        </button>, '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),
    getItem('View', 'sub1', <AppstoreOutlined />, [
        getItem(
            <button>
                <NavLink
                    to="/reportlist"
                > View list of report
                </NavLink>
            </button>
            , '5'),
        getItem(<button>
            <NavLink
                to="/teacherList"
            > View list of lecturer
            </NavLink>
        </button>, '10'),
        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];
const Slidebaes = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className='w-1/6 min-h-full bg-gray-500' >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu className="text-white "
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="grey"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
}

export default Slidebaes;
