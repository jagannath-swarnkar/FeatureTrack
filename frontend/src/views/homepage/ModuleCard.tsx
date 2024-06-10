import React from "react";
import "./homepage.css";
interface IModuleCardProps {
	onClick: any;
}
const ModuleCard = (props: IModuleCardProps) => {
	return (
		<div onClick={props.onClick} className="module-card col-md-5 col-xl-3">
			<div className="card-title text-lg m-0">Support</div>
			<p className="subtitle text-sm">Manage your module's description, logic and change history here.</p>
		</div>
	);
};

export default ModuleCard;
