import React from "react";
type Props = {
    type: "number" | "text";
    id: string;
    onChange: any;
    value: any;
    name: string;
    placeholder?: string;
};
const InputText = (props: Props) => {
    return (
        <div className="input_text_cont">
            <input
                className="input_text"
                type={props.type}
                id={props.id}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                inputMode={props.type === "number" ? "numeric" : "text"}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default InputText;
