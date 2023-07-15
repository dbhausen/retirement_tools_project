import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
	FormControl,
	FormControlProps,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import React, { ChangeEvent, MouseEvent } from 'react'

export interface PasswordFieldProps {
	label: string
	helperText?: string
	autoComplete?: string
	id?: string
	showPassword: boolean
	password: string
	// eslint-disable-next-line no-unused-vars
	setPassword: (value: string) => void
	handleClickShowPassword: () => void
}

const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
	event.preventDefault()
}

const PasswordField = (props: PasswordFieldProps & FormControlProps) => {
	const {
		label,
		autoComplete,
		helperText,
		id,
		showPassword,
		password,
		setPassword,
		handleClickShowPassword,
		...other
	} = props

	return (
		<div>
			<FormControl {...other}>
				<InputLabel htmlFor='outlined-adornment-password' shrink={true}>
					{label}
				</InputLabel>
				<OutlinedInput
					notched={true}
					value={password}
					id={id}
					autoComplete={autoComplete}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setPassword(event.target.value)
					}}
					type={showPassword ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label={label}
				/>
			</FormControl>
			<div>{helperText}</div>
		</div>
	)
}

export default PasswordField
