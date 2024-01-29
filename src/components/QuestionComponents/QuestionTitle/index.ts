/**
 * @description 问卷标题
 */
import QuestionTitle from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTitleDefaultProps } from "./interface";
export * from "./interface";

export default {
	title: "标题",
	type: "questionTitle",
	Component: QuestionTitle,
	PropComponent, //属性组件
	defaultProps: QuestionTitleDefaultProps,
};
