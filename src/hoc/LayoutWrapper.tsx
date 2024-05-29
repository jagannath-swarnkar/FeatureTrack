import React from "react";
import Header from "../components/Header";

const LayoutWrapper = (props: any) => {
	return (
		<div>
			<Header />
			<div className="layout_body">
				<div className="layout_sidebar">Sidebar</div>
				<div className="layout_content">content body</div>
			</div>
		</div>
	);
};

export default LayoutWrapper;
