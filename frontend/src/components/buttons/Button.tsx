import React from "react";
interface IButtonProps {
	children: JSX.Element | string;
	variant: "primary" | "secondary" | "tertiary";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	onClick: () => void;
	id?: string;
	className?: string;
}
const Button = (props: IButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			id={props.id ?? ""}
			className={`button button-${props.variant} button-${props.size ?? "md"} ${props.className ?? ""}`}
		>
			{props.children}
		</button>
	);
};

export default Button;
