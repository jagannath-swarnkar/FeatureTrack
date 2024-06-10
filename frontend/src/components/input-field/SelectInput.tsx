import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { ISelectInput } from "../../utils/types";

interface ISelectInputProps {
	options: ISelectInput[];
	value: ISelectInput;
	onChange: any;
	label?: string;
	required?: boolean;
	formClass?: string;
	disabled?: boolean;
	formSubmitted?: boolean;
	id: string;
	name: string;
	onBlur?: any;
	error?: string;
	placeholder?: string;
	defaultValue?: ISelectInput;
	isClearable?: boolean;
}
const SelectInput = (props: ISelectInputProps) => {
	const [error, setError] = useState<any>(props.error);
	// const [value, setValue] = useState<ISelectInput>(props.value);

	// useEffect(() => {
	// 	setValue(props.value);
	// }, [props.value]);

	useEffect(() => {
		setError(props.error);
	}, [props.error]);

	const handleChange = (event: any) => {
		props.onChange(event, props.name);
	};

	return (
		<div className={`form-group ${props.formClass || ""}`}>
			<label hidden={!props.label} className="form-label cursor-text mb-1" htmlFor={props.id}>
				{props.label}
			</label>
			<ReactSelect
				options={props.options}
				placeholder={props.placeholder}
				className={` ${!!error || (!!props.formSubmitted && !!props.required && !props.value) ? "field-invalid" : "field-valid"}`}
				classNamePrefix="react-select"
				value={props.value}
				onChange={handleChange}
				required={props.required}
				isDisabled={props.disabled}
				isClearable={props.isClearable}
				isSearchable={false}
				id={props.id}
				name={props.name}
				onBlur={props.onBlur}
				defaultValue={props.defaultValue}
			/>
			{(error || (props.required && props.formSubmitted && !props.value)) && (
				<label htmlFor={props.id} className="error mb-0">
					This field is required.
				</label>
			)}
		</div>
	);
};

export default SelectInput;
