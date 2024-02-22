import React, { FC, useCallback } from "react";
import { Typography } from "antd";
import { nanoid } from "nanoid";
import styles from "./ComponentLib.module.scss";
import { ComponentConfType, componentConfGroup } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentsReducer";
const { Title } = Typography;
const ComponentLib: FC = () => {
	const genComponent = (c: ComponentConfType) => {
		const dispatch = useDispatch();
		const { title, Component, type, defaultProps } = c;
		const handleClick = useCallback(() => {
			dispatch(
				addComponent({
					type,
					title,
					fe_id: nanoid(),
					isHidden: false,
					props: defaultProps,
				})
			);
		}, []);
		return (
			<div key={type} className={styles.wrapper} onClick={handleClick}>
				<div className={styles.component}>
					<Component />
				</div>
			</div>
		);
	};
	return (
		<>
			{componentConfGroup.map((group, index) => {
				const { groupId, groupName, components } = group;
				return (
					<div key={groupId}>
						<Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? "16px" : "0" }}>
							{groupName}
						</Title>
						<div>{components.map((c) => genComponent(c))}</div>
					</div>
				);
			})}
		</>
	);
};

export default ComponentLib;
