import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/PageInfoReducer";
export default function useLoadQuestionData() {
	const { id = "" } = useParams();
	const dispatch = useDispatch();
	// ajax 加载
	const { loading, error, data, run } = useRequest(
		async (id: string) => {
			if (!id) throw new Error("没有问卷 id");
			const data = getQuestionService(id);
			return data;
		},
		{
			manual: true,
		}
	);
	useEffect(() => {
		if (!data) return;
		const { title = "", desc = "", js = "", css = "", isPublished, componentList = [] } = data;
		// 获取默认的selectedID
		let selectedId = "";
		if (componentList.length > 0) {
			selectedId = componentList[0].fe_id;
		}
		// 把componentList 存储到 Redux Store中
		dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
		// 把问卷描述存储到 Redux Store中
		dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
	}, [data]);
	// 判断 id 变化， 执行 ajax 加载问卷数据
	useEffect(() => {
		run(id);
	}, [id]);
	return { loading, error };
}
