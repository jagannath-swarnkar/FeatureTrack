import TuneIcon from "@mui/icons-material/Tune";
import { IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import ProfileAvatar from "../components/ProfileAvatar";
import { addRemainderSubject, filterSubject } from "../utils/constant";
import { RoutesEnum } from "../utils/types";
import HideComponentWrapper from "./HideComponentWrapper";
type IHeaderProps = {
	activeNav?: string;
};
const Header = (props: IHeaderProps) => {
	const history = useHistory();
	const { activeNav } = props;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

	const handleClickFilter = () => {
		filterSubject.next({
			showFilter: true,
			page: "spends"
		});
	};
	const handleClickAddExpense = () => {
		history.push(RoutesEnum.addExpense);
	};
	const handleClickAddRemainder = () => {
		addRemainderSubject.next(true);
	};
	return (
		<React.Fragment>
			<header className="d-flex align-items-center justify-content-between layout_padding">
				<div className="logo">Logo</div>
				<div className="d-flex align-items-center">
					<ProfileAvatar src_text="User" id="profile" height="40px" width="40px" />
				</div>
			</header>
		</React.Fragment>
	);
};

export default Header;
