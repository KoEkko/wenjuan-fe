import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentInfoType, changeSelectedId } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";

type Propstype = {
	loading: boolean;
};

// 生成组件
const genComponent = (componentInfo: ComponentInfoType) => {
	const { type, props } = componentInfo;
	const componentConf = getComponentConfByType(type);
	if (componentConf === null) return null;
	const { Component } = componentConf;
	return <Component {...props} />;
};

const EditCanvas: FC<Propstype> = (props: Propstype) => {
	const { loading } = props;
	const { componentList, selectedId } = useGetComponentInfo();
	const dispatch = useDispatch();

	const handleClick = (e: MouseEvent, id: string) => {
		e.stopPropagation(); // 阻止冒泡
		dispatch(changeSelectedId(id));
	};
	if (loading) {
		return (
			<div style={{ textAlign: "center", marginTop: "24px" }}>
				<Spin />
			</div>
		);
	}

	return (
		<div className={styles.canvas}>
			{componentList
				.filter((c) => !c.isHidden)
				.map((c) => {
					const { fe_id, isLocked } = c;
					// 拼接 className
					const wrapperDefaultClassName = styles["component-wrapper"];
					const selectedClassName = styles.selected;
					const lockedClassName = styles.locked;
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: fe_id === selectedId,
						[lockedClassName]: isLocked,
					});
					return (
						<div key={fe_id} className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
							<div className={styles.component}>{genComponent(c)}</div>
						</div>
					);
				})}
		</div>
	);
};

export default EditCanvas;
