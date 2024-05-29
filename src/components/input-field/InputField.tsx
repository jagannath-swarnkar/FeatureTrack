import React, { useEffect, useState } from "react";
import { EMAIL_REGEX, URL_REGEX } from "../../utils/config";

type Props = {
	type: "text" | "number" | "email" | "password" | "tel";
	id: string;
	value: string | number | null;
	onChange: any;
	name: string;
	className: string;
	label?: string;
	required?: boolean;
	placeholder?: string;
	formSubmitted?: boolean;
	error?: string;
	formClass?: string;
	onBlur?: any;
	disabled?: boolean;
	autoFocus?: boolean;
	autoComplete?: string;
	inputMode?: any;
};

const InputField = (props: Props) => {
	const [error, setError] = useState(props.error);
	const [value, setValue] = useState<any>(props.value);

	useEffect(() => {
		setError(props.error);
	}, [props.error]);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const handleValidate = (e: any) => {
		if ((!e.target.value || e.target.value == 0) && e.target.required) {
			e.target.classList.add("field-invalid");
			setError("fieldRequired");
		} else {
			e.target.classList.remove("field-invalid");
			e.target.classList.add("field-validated");
			setError("");
		}
		props.onBlur?.();
	};

	return (
		<div className={`form-group ${props.formClass || ""}`}>
			<label hidden={!props.label} className="form-label cursor-text mb-1" htmlFor={props.id}>
				{props.label}
			</label>
			<input
				id={props.id}
				name={props.name}
				className={`form-field ${props.className}`}
				type={props.type}
				value={value}
				field-invalid={String(!!props.formSubmitted && !props.value && !!props.required)}
				field-not-empty={String(!!props.value)}
				onBlur={handleValidate}
				onChange={props.onChange}
				required={props.required}
				disabled={props.disabled}
				autoFocus={props.autoFocus}
				autoComplete={props.autoComplete || "off"}
				inputMode={props.inputMode}
				placeholder={props.placeholder}
			/>

			{(error || (props.required && props.formSubmitted && !props.value)) && (
				<label htmlFor={props.id} className="error mb-0">
					This field is required.
				</label>
			)}
		</div>
	);
};

export default InputField;
