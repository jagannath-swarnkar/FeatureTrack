import React from "react";
import LayoutWrapper from "../../hoc/LayoutWrapper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ModuleCard from "../homepage/ModuleCard";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ModuleDetails = () => {
	const history = useHistory();
	const params: { moduleId: string } = useParams();

	const handleClickModule = () => {
		const featureId = 495;
		history.push(`/modules/${params.moduleId}/f/${featureId}`);
	};
	return (
		<LayoutWrapper>
			<div className="">
				<Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb pl-0">
					<NavLink to={"/"}>
						<i className="ph ph-house pr-1"></i>
						Modules
					</NavLink>
					,<p>Merchant Profile</p>
				</Breadcrumbs>
				<div className="my-3">
					<h4>Merchant Profile</h4>
					<p className="subtitle text-sm">Manage your module's description, logic and change history here.</p>
				</div>
				<br />
				<section>
					<div className="d-flex justify-content-between">
						<h5 className="text-info">Pages</h5>
						<Button variant="outlined" size="small" startIcon={<AddIcon />}>
							Add New
						</Button>
					</div>
					<p className="subtitle">Manage your module's description, logic and change history here.</p>
					<div className="gap-1 col-12 row mt-3">
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
					</div>
				</section>
				<br />
				<hr />
				<br />
				<section>
					<div className="d-flex justify-content-between">
						<h5 className="text-info">Feature / Component</h5>
						<Button variant="outlined" size="small" startIcon={<AddIcon />}>
							Add New
						</Button>
					</div>
					<p className="subtitle">Manage your module's description, logic and change history here.</p>
					<div className="gap-1 col-12 row mt-3">
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
					</div>
				</section>
				<br />
				<br />
			</div>
		</LayoutWrapper>
	);
};

export default ModuleDetails;
