import React from "react";
import Header from "../components/Header";
import Sidebar from "../views/Sidebar";

interface ILayoutWrapperProps {
	children: JSX.Element;
}
const LayoutWrapper = (props: ILayoutWrapperProps) => {
	return (
		<div>
			<Header />
			<div className="layout_body">
				<div className="layout_sidebar">
					<Sidebar />
				</div>
				<div className="layout_content">{props.children}</div>
			</div>
		</div>
	);
};

export default LayoutWrapper;
