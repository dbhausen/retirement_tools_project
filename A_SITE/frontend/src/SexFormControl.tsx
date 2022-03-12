import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { FEMALE, MALE } from 'life'

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
