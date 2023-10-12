import React, { Children, ReactNode, useState } from 'react';
import { InfoCircleOutlined, FormOutlined, SnippetsOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import "../../style/Sidebar.css";
import { useNavigate } from 'react-router-dom';
import { clearAllCookies } from "../../utils/refresh_token";
import { clearAccessToken } from "../../store/LoginReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../store/store';
import { Button } from "antd";
import CreateTodoForm from '../TaskPage/CreateTodo';

const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function SideBar({children}:{children:ReactNode}) {

  const [showCreateTodoForm, setShowCreateTodoForm] = useState(false);

  const items: MenuItem[] = [
    getItem("Todo", "drop_list", <SnippetsOutlined  />, [
      getItem("Create Todo", "create_todo"),
      getItem("List Todo ", "list_todo"),
    ]),
  ];

  const handleMenuClick = (key: string) => {
    if (key === "create_todo") {
      setShowCreateTodoForm(true);
    } else {
      setShowCreateTodoForm(false);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = () => {
    clearAllCookies();
    dispatch(clearAccessToken());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={160} theme="dark">
        <div className="custom-logo-vertical" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={(e) => handleMenuClick(e.key)}
        />
        <Button onClick={handleLogOut}>Sign Out</Button>
      </Sider>

      <Layout>
        <Header className="header-sidebar">App Todo</Header>
        <Content className="content-sidebar">
          {showCreateTodoForm ? <CreateTodoForm /> : children}
        </Content>
        <Footer className='footer-sidebar' style={{ textAlign: "center" }}>
          App Todo created by LeHuy
        </Footer>
      </Layout>
      
    </Layout>
  );
}