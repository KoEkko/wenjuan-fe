import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import cloneDeep from "lodash.clonedeep";
import { getNextSelectedId, insertNewComponent } from "./utils";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
// 在 redux store中的组件信息 类型
export type ComponentInfoType = {
	fe_id: string; // 前端生成的ID， 服务端 MongoDb 不认这种格式， 所以自定义一个 fe_id
	type: string; // 根据 type 来判断是哪个组件
	title: string;
	isHidden?: boolean;
	isLocked?: boolean;
	props: ComponentPropsType;
};

export type ComponentsStateType = {
	selectedId: string; // 当前被选中的组件的ID
	componentList: Array<ComponentInfoType>; // 组件列表
	copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
	selectedId: "",
	componentList: [],
	copiedComponent: null,
};

export const componentsSlice = createSlice({
	name: "components",
	initialState: INIT_STATE,
	reducers: {
		// 重置所有组件
		resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
			return action.payload;
		},
		// 修改selected
		changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
			draft.selectedId = action.payload;
		}),
		// 添加组件
		addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
			const newComponent = action.payload;
			insertNewComponent(draft, newComponent);
		}),
		// 修改属性
		changeComponentProps: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>) => {
				const { fe_id, newProps } = action.payload;
				// 当前要修改的属性
				const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
				if (curComp) {
					curComp.props = {
						...curComp.props,
						...newProps,
					};
				}
			}
		),
		// 删除选中的组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId: removeId, componentList = [] } = draft;
			// 重新计算 selectedId
			const newSelectedId = getNextSelectedId(removeId, componentList);
			draft.selectedId = newSelectedId;
			const index = componentList.findIndex((c) => c.fe_id === removeId);
			componentList.splice(index, 1);
		}),
		// 隐藏/显示 组件
		changeComponentHidden: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
				const { componentList = [] } = draft;
				const { fe_id, isHidden } = action.payload;

				let newSelectedId = "";
				if (isHidden) {
					// 要隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList);
				} else {
					// 要显示
					newSelectedId = fe_id;
				}
				draft.selectedId = newSelectedId;
				const curComp = componentList.find((c) => c.fe_id === fe_id);
				if (curComp) {
					curComp.isHidden = isHidden;
				}
			}
		),
		// 锁定 / 解锁 组件
		toggleComponentLocked: produce((draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
			const { fe_id } = action.payload;
			const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
			if (curComp) {
				curComp.isLocked = !curComp.isLocked;
			}
		}),
		// 复制
		copySelectedComponent: produce((drfat: ComponentsStateType) => {
			const { selectedId, componentList } = drfat;
			const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
			if (selectedComponent === null) return;
			drfat.copiedComponent = cloneDeep(selectedComponent!);
		}),
		// 粘贴
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent } = draft;
			if (copiedComponent === null) return;

			// 修改fe_id;
			copiedComponent.fe_id = nanoid();
			insertNewComponent(draft, copiedComponent);
		}),
		// 选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft;
			const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
			if (selectedIndex < 0) return; // 未选中组件
			if (selectedIndex <= 0) return; // 已经选中了第一个
			draft.selectedId = componentList[selectedIndex - 1].fe_id;
		}),
		// 选中下一个
		selectNextCompoent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft;
			const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
			if (selectedIndex < 0) return;
			if (selectedIndex >= componentList.length - 1) return;
			draft.selectedId = componentList[selectedIndex + 1].fe_id;
		}),
		// 修改选中标题
		changeComponentTitle: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
				const { fe_id, title } = action.payload;
				const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
				if (curComp) {
					curComp.title = title;
				}
			}
		),
		// 移动组件位置
		moveComponent: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
				const { componentList: curComponentList } = draft;
				const { oldIndex, newIndex } = action.payload;
				draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
			}
		),
	},
});

export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLocked,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextCompoent,
	changeComponentTitle,
	moveComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
