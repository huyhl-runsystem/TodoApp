import React, { Children, ReactNode } from 'react';
import { InfoCircleOutlined, FormOutlined, SnippetsOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import "../../style/Sidebar.css";

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
  const items: MenuItem[] = [
    getItem("Todo", "drop_list", <SnippetsOutlined  />, [
      getItem("Create Todo", "create_todo"),
      getItem("List Todo ", "list_todo"),
    ]),
  ];

  const handleMenuClick = (e: string) => {
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
      </Sider>
      <Layout>
        <Header className="header-sidebar">App Todo</Header>
        <Content className="content-sidebar">{children}</Content>
        <Footer className='footer-sidebar' style={{ textAlign: "center" }}>
          App Todo created by LeHuy
        </Footer>
      </Layout>
    </Layout>
  );
}