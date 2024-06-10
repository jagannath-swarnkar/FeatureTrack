import React from "react";
import LayoutWrapper from "../../hoc/LayoutWrapper";
import ModuleCard from "./ModuleCard";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router";
const Homepage = () => {
	const history = useHistory();
	const handleClickModule = () => {
		const moduleid = 3483743;
		history.push(`/modules/${moduleid}`);
	};
	return (
		<LayoutWrapper>
			<div className="homepage">
				<section>
					<div className="d-flex justify-content-between">
						<h4>Modules</h4>
						<Button variant="outlined" size="small" startIcon={<AddIcon />}>
							Add New
						</Button>
					</div>
					<p className="subtitle">Manage your module's description, logic and change history here.</p>
					<div className="gap-1 col-12 row mt-3">
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
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
						<h4>Components</h4>
						<Button variant="outlined" size="small" startIcon={<AddIcon />}>
							Add New
						</Button>
					</div>
					<p className="subtitle">Manage your component description, logic and change history here.</p>
					<div className="gap-1 col-12 row">
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
						<ModuleCard onClick={handleClickModule} />
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
						<h4>Pages</h4>
						<Button variant="outlined" size="small" startIcon={<AddIcon />}>
							Add New
						</Button>
					</div>
					<p className="subtitle">Manage your page description, logic and change history here.</p>
					<div className="gap-1 col-12 row">
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

export default Homepage;
