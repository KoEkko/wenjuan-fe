import React, { FC } from "react";
import { Tabs } from "antd";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
const LeftPanel: FC = () => {
	const tabsItems = [
		{
			key: "componentLib",
			label: (
				<span>
					<AppstoreAddOutlined />
					组件库
				</span>
			),
			children: <ComponentLib />,
		},
		{
			key: "layers",
			label: (
				<span>
					<BarsOutlined />
					图层
				</span>
			),
			children: "图层",
		},
	];
	return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>;
};

export default LeftPanel;