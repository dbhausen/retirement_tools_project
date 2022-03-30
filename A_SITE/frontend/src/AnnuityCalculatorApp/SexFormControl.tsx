import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
// import { FEMALE, MALE } from 'life'

interface IProps {
	name: string
	label: string
	value: string
	onChange: any
	disabled: boolean
}

export default function SexFormControl(props: IProps) {
	const { name, value, onChange, label, disabled } = props
	const handleChange = onChange
	const textColor = disabled ? 'text.disabled' : 'text.primary'
	const MALE = 'Male'
	const FEMALE = 'Female'
	return (
		<FormControl>
			<RadioGroup
				row
				aria-labelledby='demo-controlled-radio-buttons-group'
				name={name}
				value={value}
				onChange={handleChange}
			>
				<Typography
					sx={{
						padding: 1,

						color: textColor,
					}}
				>
					{label}
				</Typography>
				<FormControlLabel
					sx={{}}
					disabled={disabled}
					value={FEMALE}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label={FEMALE}
				/>
				<FormControlLabel
					disabled={disabled}
					value={MALE}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label={MALE}
				/>
			</RadioGroup>
		</FormControl>
	)
}
