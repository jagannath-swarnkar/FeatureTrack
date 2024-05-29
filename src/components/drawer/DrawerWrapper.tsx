import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
	children: JSX.Element;
	open: boolean;
	handleClose: (open: boolean) => void;
	anchor?: Anchor;
	enableBackdropClick?: boolean;
	disableBackdrop?: boolean;
};
const DrawerWrapper = (props: Props) => {
	const anchor: Anchor = props.anchor || "bottom";
	const [open, setOpen] = React.useState(false);
	React.useEffect(() => {
		if (props.open !== open) {
			setOpen(props.open);
		}
	}, [props.open]);

	const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		// console.log("open", open);
		// console.log("anchor", anchor);
	};
	const handleCloseDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (!event) {
			setOpen(false);
			props.handleClose(false);
		}
	};
	return (
		<SwipeableDrawer
			className=""
			anchor={anchor}
			open={open}
			disableBackdropTransition={!props.enableBackdropClick}
			disableEscapeKeyDown={!props.enableBackdropClick}
			disableSwipeToOpen={true}
			onClose={handleCloseDrawer(anchor, false)}
			onOpen={toggleDrawer(anchor, true)}
			variant={props.disableBackdrop ? "persistent" : "temporary"}
		>
			<div className="position-relative">
				<span className="slider_gate"></span>
				{props.children}
			</div>
		</SwipeableDrawer>
	);
};
export default DrawerWrapper;
