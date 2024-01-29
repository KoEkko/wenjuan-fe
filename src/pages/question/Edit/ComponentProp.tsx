import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentInfoType, changeComponentProps } from "../../../store/componentsReducer";
import { ComponentConfType, ComponentPropsType, getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";

const NoProp: FC = () => {
	return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
	const dispatch = useDispatch();
	const { selectedComponent } = useGetComponentInfo();
	if (selectedComponent === undefined) return <NoProp />;
	const { type, props, isLocked } = selectedComponent as ComponentInfoType;
	const componentConf = getComponentConfByType(type);
	if (componentConf === undefined) return <NoProp />;

	function changeProps(newProps: ComponentPropsType) {
		if (selectedComponent === undefined) return;
		const { fe_id } = selectedComponent;
		dispatch(changeComponentProps({ fe_id, newProps }));
	}

	const { PropComponent } = componentConf as ComponentConfType;
	return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />;
};

export default ComponentProp;
