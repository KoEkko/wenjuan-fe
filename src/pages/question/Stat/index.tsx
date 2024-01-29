import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
const Stat: FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { loading } = useLoadQuestionData();
	return (
		<>
			<p>Stat page</p>
		</>
	);
};

export default Stat;
