import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {
	copySelectedComponent,
	pasteCopiedComponent,
	removeSelectedComponent,
	selectNextCompoent,
	selectPrevComponent,
} from "../store/componentsReducer";

/**
 * 判断当前鼠标光标 focus的哪个元素
 */
function isActiveElementVaild() {
	const activeElem = document.activeElement;
	if (activeElem === document.body) return true; // 光标没有 focus 到 input上
	if (activeElem?.matches("div[role='button']")) return true;
	return false;
}

function useBindCanvasKeyPress() {
	const dispatch = useDispatch();

	// 删除组件
	useKeyPress(["backspace", "delete"], () => {
		if (!isActiveElementVaild()) return;
		dispatch(removeSelectedComponent());
	});

	// 复制组件
	useKeyPress(["ctrl.c", "meta.c"], () => {
		if (!isActiveElementVaild()) return;
		dispatch(copySelectedComponent());
	});

	// 粘贴组件
	useKeyPress(["ctrl.v", "meta.v"], () => {
		if (!isActiveElementVaild()) return;
		dispatch(pasteCopiedComponent());
	});

	// 选中上一个
	useKeyPress("uparrow", () => {
		if (!isActiveElementVaild()) return;
		dispatch(selectPrevComponent());
	});

	// 选中下一个
	useKeyPress("downarrow", () => {
		if (!isActiveElementVaild()) return;
		dispatch(selectNextCompoent());
	});
	// 撤销
	useKeyPress(
		["ctrl.z", "meta.z"],
		() => {
			if (!isActiveElementVaild()) return;
			dispatch(UndoActionCreators.undo());
		},
		{
			exactMatch: true,
		}
	);
	// 重做
	useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
		if (!isActiveElementVaild()) return;
		dispatch(UndoActionCreators.redo());
	});
}
export default useBindCanvasKeyPress;
