import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 各个组件的 prop type，统一起来
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

// 各个组件的配置, 统一起来
export type ComponentConfType = {
	title: string;
	type: string;
	Component: FC<ComponentPropsType>;
	PropComponent: FC<ComponentPropsType>;
	defaultProps: ComponentPropsType;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

// 组件配置分组
export const componentConfGroup = [
	{
		groupId: "textGroup",
		groupName: "文本显示",
		components: [QuestionTitleConf],
	},
	{
		groupId: "inputGropu",
		groupName: "用户输入",
		components: [QuestionInputConf],
	},
];

export function getComponentConfByType(type: string) {
	return componentConfList.find((c) => c.type === type) || null;
}
