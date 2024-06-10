import React from "react";

const Sidebar = () => {
	return (
		<ul>
			<div className="sidebar_title">Connect</div>
			<li>
				<i className="ph ph-house" />
				Home
			</li>
			<li>
				<i className="ph ph-clock-counter-clockwise"></i>
				History
			</li>
		</ul>
	);
};

export default Sidebar;
