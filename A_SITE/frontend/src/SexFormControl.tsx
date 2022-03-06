import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

interface IProps {
	name: string
	value: string
	onChange: any
}

export default function SexFormControl(props: IProps) {
	const { name, value, onChange } = props
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
				<FormControlLabel
					value='Female'
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='Female'
				/>
				<FormControlLabel
					value='Male'
					control={
						<Radio
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 14,
								},
							}}
						/>
					}
					label='Male'
				/>
			</RadioGroup>
		</FormControl>
	)
}
