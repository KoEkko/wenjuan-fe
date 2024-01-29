/**
 * @description 问卷输入框
 */

import QuestionInput from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInputDefaultType } from "./interface";

export * from "./interface";
// 组件的配置
export default {
	title: "输入框标题",
	type: "questionInput",
	Component: QuestionInput,
	PropComponent,
	defaultProps: QuestionInputDefaultType,
};
