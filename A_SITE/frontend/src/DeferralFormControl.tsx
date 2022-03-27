import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'

interface IProps {
	name: string
	label: string
	value: number
	onChange: any
}

export default function DeferFormControl(props: IProps) {
	const { name, value, onChange, label } = props
	const handleChange = onChange
	return (
		<FormControl>
			<RadioGroup
				row
				aria-labelledby='demo-controlled-radio-buttons-group'
				name={name}
				value={value}
				onChange={handleChange}
			>
				<Typography sx={{ padding: 1 }}>{label}</Typography>
				<FormControlLabel
					value={0}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='Immediate'
				/>
				<FormControlLabel
					value={65}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='65'
				/>
				<FormControlLabel
					value={70}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='70'
				/>
				<FormControlLabel
					value={75}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='75'
				/>
				<FormControlLabel
					value={80}
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='80'
				/>
			</RadioGroup>
		</FormControl>
	)
}
