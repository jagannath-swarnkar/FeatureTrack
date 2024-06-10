import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import HideComponentWrapper from "../HideComponentWrapper";

interface ISelectInputProps {
	value: string;
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
	defaultValue?: string;
	disalbleTime?: boolean;
	className?: string;
	floatingLabel?: string;
	format?: string;
}
const DateInput = (props: ISelectInputProps) => {
	const [error, setError] = useState<any>(props.error);

	useEffect(() => {
		setError(props.error);
	}, [props.error]);

	const handleChange = (event: any) => {
		props.onChange(event, props.name);
	};
	const handleSelectDate = (date: any) => {
		if (date) {
			const time = dayjs(date).format(props.format || "YYYY-MM-DD HH:mm");
			props.onChange(time, props.name);
		} else {
			props.onChange("", props.name);
		}
	};

	return (
		<div className={`form-group ${props.formClass || ""}`}>
			<label hidden={!props.label} className="form-label cursor-text mb-1" htmlFor={props.id}>
				{props.label}
			</label>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={["DateTimePicker", "DateTimePicker", "DatePicker"]}>
					<HideComponentWrapper hidden={!!props.disalbleTime}>
						<DateTimePicker
							label={props.floatingLabel || ""}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock
							}}
							selectedSections={undefined}
							value={dayjs(props.value)}
							// defaultValue={dayjs(new Date())}
							onSelectedSectionsChange={() => {}}
							className={`date-time-picker ${props.className || ""}`}
							onAccept={(date) => {
								handleSelectDate(date);
							}}
						/>
					</HideComponentWrapper>
					<HideComponentWrapper hidden={!props.disalbleTime}>
						<DatePicker
							label={props.floatingLabel || ""}
							value={props.value ? dayjs(props.value) : null}
							className={`date-time-picker ${props.className || ""}`}
							onAccept={(date) => {
								handleSelectDate(date);
							}}
						/>
					</HideComponentWrapper>
				</DemoContainer>
			</LocalizationProvider>
			{(error || (props.required && props.formSubmitted && !props.value)) && (
				<label htmlFor={props.id} className="error mb-0">
					This field is required.
				</label>
			)}
		</div>
	);
};
export default DateInput;
