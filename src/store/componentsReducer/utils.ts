import { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
	const visibleComponentList = componentList.filter((c) => !c.isHidden);
	const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
	// 未选中组件
	if (index < 0) return "";

	// 重新计算 seletcedID
	let newSelectedId = "";
	const length = visibleComponentList.length;
	if (length <= 1) {
		// 组件长度就一个，被删除了就没有了
		newSelectedId = "";
	} else {
		// 组件长度大于1
		if (index + 1 === length) {
			// 要删除的是最后一个, 就选中上一个
			newSelectedId = visibleComponentList[index - 1].fe_id;
		} else {
			// 要删除的不是最后一个，删除以后，选中下一个
			newSelectedId = visibleComponentList[index + 1].fe_id;
		}
	}
	return newSelectedId;
}

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
	const { selectedId, componentList } = draft;
	const index = componentList.findIndex((c) => c.fe_id === selectedId);
	if (index < 0) {
		// 未选中组件
		draft.componentList.push(newComponent);
	} else {
		componentList.splice(index + 1, 0, newComponent);
	}
	draft.selectedId = newComponent.fe_id;
}
