import React from 'react';
import { InfoCircleOutlined, FormOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import "../../style/Sidebar.css";

const { Header, Content, Footer, Sider } = Layout;

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

export default function SideBar() {
    const { t } = useTranslation();
    const items: MenuItem[] = [
      getItem(t("User"), "sub1", <InfoCircleOutlined />, [
        getItem(t("ListUser"), "1"),
        getItem(t("Info"), "2"),
      ]),
      getItem(t("Todo"), "sub2", <FormOutlined />, [
        getItem(t("ListTodo"), "3"),
        getItem(t("CreateTodo"), "4"),
      ]),
    ];
    const handleMenuClick = (e: string) => {
      console.log("Clicked on menu item:", e);
    };
  
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="custom-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            onClick={(e) => handleMenuClick(e.key)}
          />
        </Sider>
        <Layout>
          <Header className="custom-header-sidebar"></Header> 
          <Content className="custom-content-sidebar"></Content> 
          <Footer style={{ textAlign: "center" }}>
            Apptodo created by LeHuy
          </Footer>
        </Layout>
      </Layout>
    );
  }