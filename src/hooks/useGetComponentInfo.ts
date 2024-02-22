import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

/**
 * @description 从 redux store 中获取组件信息
 * @returns { componentList , selectedId, selected }
 */
function useGetComponentInfo() {
	const components = useSelector<StateType>((state) => state.components.present) as ComponentsStateType;
	const { componentList = [], selectedId = "", copiedComponent } = components;
	const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
	return {
		componentList,
		selectedId,
		selectedComponent,
		copiedComponent,
	};
}
export default useGetComponentInfo;
