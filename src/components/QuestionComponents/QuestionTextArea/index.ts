/**
 * @description 问卷输入框
 */

import QuestionTextarea from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextareaDefaultType } from "./interface";

export * from "./interface";
// 组件的配置
export default {
	title: "输入框标题",
	type: "questionTextarea",
	Component: QuestionTextarea,
	PropComponent,
	defaultProps: QuestionTextareaDefaultType,
};
