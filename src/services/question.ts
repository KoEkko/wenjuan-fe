import axios from "./ajax";
import type { ResDataType } from "./ajax";

type SearchType = {
	keyword: string;
	isStar: boolean;
	isDeleted: boolean;
	page: number;
	pageSize: number;
};

// 获取单个问卷列表
export async function getQuestionService(id: string): Promise<ResDataType> {
	const url = `/api/question/${id}`;
	const data = (await axios.get(url)) as ResDataType;
	return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
	const url = `/api/question`;
	const data = (await axios.post(url)) as ResDataType;
	return data;
}

// 获取问卷列表
export async function getQuestionListService(opt: Partial<SearchType> = {}): Promise<ResDataType> {
	const url = `/api/question`;
	const data = (await axios.get(url, { params: opt })) as ResDataType;
	return data;
}

// 更新问卷
export async function updateQuestionService(id: string, opt: { [key: string]: any }): Promise<ResDataType> {
	const url = `/api/question/${id}`;
	const data = (await axios.patch(url, { opt })) as ResDataType;
	return data;
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
	const url = `/api/question/duplicate/${id}`;
	const data = (await axios.post(url)) as ResDataType;
	return data;
}

// 删除问卷
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
	const url = `/api/question`;
	const data = (await axios.delete(url, { data: ids })) as ResDataType;
	return data;
}
