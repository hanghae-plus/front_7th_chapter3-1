import React from 'react';
import {
	NativeSelect,
	NativeSelectOption,
} from '@/components/ui/native-select';
import { Label } from '../ui/label';

interface FormSelectProps {
	selectOptions: { value: string; label: string }[];
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	name?: string;
	disabled?: boolean;
	label?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
	selectOptions,
	value,
	onChange,
	onBlur,
	name,
	disabled,
	label,
}) => {
	return (
		<div>
			{label && <Label htmlFor={name}>{label}</Label>}
			<NativeSelect
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				disabled={disabled}
			>
				{selectOptions.map((option) => (
					<NativeSelectOption key={option.value} value={option.value}>
						{option.label}
					</NativeSelectOption>
				))}
			</NativeSelect>
		</div>
	);
};

export default FormSelect;
