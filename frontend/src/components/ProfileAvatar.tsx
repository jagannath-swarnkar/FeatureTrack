import React, { useMemo } from "react";
import { getAvatarText } from "../utils/functions";
type Props = {
	src?: string;
	src_text: string;
	id: string;
	height: string;
	width: string;
	loading?: "lazy" | "eager";
	alt?: string;
	className?: string;
	style?: object;
	fontSize?: string;
	onClick?: any;
};
const ProfileAvatar = ({ src, src_text, className, ...props }: Props) => {
	const avatarText = useMemo(() => {
		return getAvatarText(src_text);
	}, [src_text]);
	return (
		<React.Fragment>
			{src ? (
				<img
					src={src}
					className={`profile-pic-img ${className || ""}`}
					onError={(e: any) => (e.target.src = "/images/user.png")}
					loading="lazy"
					alt={"avatar icon"}
					{...props}
				/>
			) : (
				<div
					style={{ height: props.height || "2rem", width: props.width || "2rem", minWidth: props.width || "2rem" }}
					className={`profile-pic ${className || ""}`}
					onClick={props.onClick}
				>
					<span style={{ fontSize: props.fontSize || "12px" }}>{avatarText}</span>
				</div>
			)}
			<style>{`
                .profile-pic{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid var(--text-secondary);
                    border-radius: 50px;
                }
            `}</style>
		</React.Fragment>
	);
};

export default ProfileAvatar;
