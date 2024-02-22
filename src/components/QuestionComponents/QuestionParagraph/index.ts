import QuestionParagraph from "./Component";
import PropComponent from "./PropComponent";
import { QuestionParagraphDefaultProps } from "./interface";

export * from "./interface";

// 段落组件的默认配置
export default {
	title: "段落",
	type: "questionParagraph",
	Component: QuestionParagraph,
	PropComponent,
	defaultProps: QuestionParagraphDefaultProps,
};
