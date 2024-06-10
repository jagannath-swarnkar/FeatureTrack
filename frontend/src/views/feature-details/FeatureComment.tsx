import React from "react";
import ProfileAvatar from "../../components/ProfileAvatar";
import moment from "moment";
interface IFeatureCommentProps {
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
}
const FeatureComment = (props: IFeatureCommentProps) => {
	return (
		<div className="comment_card">
			<div className="card-title text-md m-0">{props.title}</div>
			<p className="subtitle text-sm">{props.description}</p>
			<div className="comment_by_time mt-2 d-flex">
				<div className="d-flex ml-auto">
					<ProfileAvatar src_text={props.updatedBy} id={props.updatedBy} height={"1.625rem"} width={"1.625rem"} className="mr-2" />
					<div className="">
						<p className="text-sm">{props.updatedBy}</p>
						<p className="text-xs">{moment(props.updatedAt).format("hh:mm A - DD MMM, YYYY")}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeatureComment;
