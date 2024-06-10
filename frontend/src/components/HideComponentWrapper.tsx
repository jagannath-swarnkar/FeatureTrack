import React from "react";
type IProps = {
	show?: boolean;
	hidden?: boolean;
	children: JSX.Element;
};
const HideComponentWrapper = (props: IProps) => {
	if (props.hidden === false || props.show) return props.children;
	return <React.Fragment></React.Fragment>;
};

export default HideComponentWrapper;
