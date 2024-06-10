import React, { useState } from "react";
import LayoutWrapper from "../../hoc/LayoutWrapper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useParams } from "react-router-dom";
import FeatureComment from "./FeatureComment";
import "./comments.css";
import AddEditComment from "./AddEditComment";
import HideComponentWrapper from "../../components/HideComponentWrapper";
import Button from "../../components/buttons/Button";

const FeatureDetails = () => {
	const [openEditor, setOpenEditor] = useState<boolean>(false);
	const params: { moduleId: string; featureId: string } = useParams();
	const commentsList = [
		{
			title: "View Permissions",
			description: "Only admin admin and partner will have permission to view history of anyone. and merchant can view their own history.",
			createdAt: "2024-05-28",
			updatedAt: "2024-05-29",
			createdBy: "Jagan Swarnkar",
			updatedBy: "Satyam Chauhan"
		}
	];

	const handleClickAddComment = () => {
		setOpenEditor(!openEditor);
	};

	return (
		<LayoutWrapper>
			<div className="">
				<Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb pl-0">
					<NavLink to={"/"}>
						<i className="ph ph-house pr-1"></i>
						Modules
					</NavLink>
					,<NavLink to={`/modules/${params.moduleId}`}>Merchant Profile</NavLink>,<p>Merchant History</p>
				</Breadcrumbs>
				<div className="my-3">
					<div className="d-flex justify-content-between">
						<h4>Merchant History</h4>
						<Button onClick={handleClickAddComment} variant={openEditor ? "primary" : "secondary"} size="sm">
							{openEditor ? "Cancel Comment" : "Add Comment"}
						</Button>
					</div>
					<p className="subtitle text-sm">Manage your module's description, logic and change history here.</p>
				</div>
				<br />
				<HideComponentWrapper hidden={!openEditor}>
					<AddEditComment />
				</HideComponentWrapper>

				<div className="comments_cont">
					{commentsList.map((item, index) => (
						<FeatureComment key={index} {...item} />
					))}
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default FeatureDetails;
