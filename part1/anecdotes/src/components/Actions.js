import Button from "./Button";
import React from "react";

const Actions = ({actions}) => {
	return (
		<>
			{actions.map(action => <Button key={action.text} text={action.text} onClick={action.onClick} />)}
		</>
	);
};

export default Actions;