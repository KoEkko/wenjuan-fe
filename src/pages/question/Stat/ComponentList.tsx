import React, { FC } from "react";
import styles from "./ComponentList.module.scss";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import classNames from "classnames";

type PropsType = {
	selectedComponentdId: string;
	setSelectedComponentId: (id: string) => void;
	setSelectedCompoentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props: PropsType) => {
	const { selectedComponentdId, setSelectedComponentId, setSelectedCompoentType } = props;
	const { componentList = [] } = useGetComponentInfo();

	return (
		<div className={styles.container}>
			{componentList
				.filter((c) => !c.isHidden)
				.map((c) => {
					const { fe_id, props, type } = c;
					const componentConf = getComponentConfByType(type);
					if (componentConf === null) return null;
					const { Component } = componentConf;
					// 拼接 className
					const wrapperDefaultClassName = styles["component-wrapper"];
					const selectedClassName = styles.selected;
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: fe_id === selectedComponentdId,
					});
					return (
						<div
							className={wrapperClassName}
							key={fe_id}
							onClick={() => {
								setSelectedComponentId(fe_id);
								setSelectedCompoentType(type);
							}}
						>
							<div className={styles.component}>
								<Component {...props} />
							</div>
						</div>
					);
				})}
		</div>
	);
};
export default ComponentList;
