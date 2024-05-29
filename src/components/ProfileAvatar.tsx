import React from "react";
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
    return (
        <React.Fragment>
            {src ? (
                <img
                    src={src}
                    className={`profile-pic-img ${className}`}
                    onError={(e: any) => (e.target.src = "/images/user.png")}
                    loading="lazy"
                    alt={"avatar icon"}
                    {...props}
                />
            ) : (
                <div
                    style={{ height: props.height || "38px", width: props.width || "38px", minWidth: props.width || "38px" }}
                    className={`profile-pic ${className}`}
                    onClick={props.onClick}
                >
                    <span style={{ fontSize: props.fontSize || "large" }}>{src_text[0]}</span>
                </div>
            )}
        </React.Fragment>
    );
};

export default ProfileAvatar;
