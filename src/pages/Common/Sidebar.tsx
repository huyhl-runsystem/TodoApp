import React, { Children, ReactNode, useState } from "react";
import { Input, Layout, Modal } from "antd";
import "../../style/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { clearAllCookies } from "../../utils/refresh_token";
import { clearAccessToken } from "../../store/LoginReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Button } from "antd";
import CreateTodoForm from "../TaskPage/CreateTodo";
import { ITodo } from "../../interfaces/ITodo";

const { Header, Sider, Content, Footer } = Layout;

interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const todo: ITodo = {
    _id: "",
    title: "",
    desc: "",
    status: 1,
    user_id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };

  const handleLogOut = () => {
    clearAllCookies();
    dispatch(clearAccessToken());
    navigate("/login");
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  const handleAddClick = () => {
    showModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleListTodoClick = () => {
    navigate("/todolist");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="sider" width={160}>
        <div className="sider-buttons">
          <Button
            type="link"
            className="sider-button"
            onClick={handleProfileClick}
          >
            Profile
          </Button>
          <Button
            type="link"
            className="sider-button"
            onClick={handleListTodoClick}
          >
            List Todo
          </Button>
          <Button type="link" className="sider-button" onClick={handleLogOut}>
            Sign Out
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header className="header-sidebar">App Todo</Header>
        <Content className="content-sidebar">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              style={{ marginRight: "10px", marginLeft: "10px" }}
              placeholder="Type here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button
              type="primary"
              onClick={handleAddClick}
              style={{ marginRight: "10px", marginLeft: "10px" }}
            >
              Create new todo
            </Button>

            <Modal
              title="Create New Todo"
              visible={isModalVisible}
              onCancel={handleCloseModal}
              footer={null}
            >
              <CreateTodoForm todo={todo} />
            </Modal>
          </div>

          {!isModalVisible && children}
        </Content>
        <Footer className="footer-sidebar" style={{ textAlign: "center" }}>
          App Todo created by LeHuy
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SideBar;
