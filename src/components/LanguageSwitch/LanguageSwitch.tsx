import React from "react";
import "../../style/LanguageSwitch.css";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
const { Option } = Select;

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switch">
      <Select
        defaultValue={i18n.language}
        style={{ width: 120 }}
        onChange={changeLanguage}
      >
        <Option value="en"> English </Option>
        <Option value="vi"> Vietnamese </Option>
      </Select>
    </div>
  );
};

export default LanguageSwitch;
