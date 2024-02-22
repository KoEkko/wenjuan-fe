import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentInfoType, changeSelectedId, moveComponent } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

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
	useBindCanvasKeyPress();

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
	const componentListWithId = componentList.map((c) => {
		return { ...c, id: c.fe_id };
	});
	function handleDragEnd(oldIndex: number, newIndex: number) {
		dispatch(moveComponent({ oldIndex, newIndex }));
	}
	return (
		<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
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
							<SortableItem key={fe_id} id={fe_id}>
								<div className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
									<div className={styles.component}>{genComponent(c)}</div>
								</div>
							</SortableItem>
						);
					})}
			</div>
		</SortableContainer>
	);
};

export default EditCanvas;
