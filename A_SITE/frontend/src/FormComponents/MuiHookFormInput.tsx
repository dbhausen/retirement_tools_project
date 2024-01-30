import {
	Checkbox,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Slider,
	TextField,
	Typography,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { MouseEvent } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ErrorMessage } from '@hookform/error-message'

const FormSlider = (fieldProps: any) => {
	const {
		name,
		rules,
		onChange: onChangeApi,
		onBlur: onBlurApi,
		...other
	} = fieldProps
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, ...field },
				// eslint-disable-next-line no-unused-vars
				fieldState: { error, isDirty, isTouched },
			}) => (
				<Slider
					{...field}
					onChange={e => {
						onChange(e)
						if (onChangeApi) onChangeApi(e)
					}}
					onBlur={() => {
						onBlur()
						if (onBlurApi) onBlurApi()
					}}
					{...other}
				/>
			)}
		/>
	)
}

const FormTextField = (fieldProps: any) => {
	const {
		name,
		rules,
		onChange: onChangeApi,
		onBlur: onBlurApi,
		...other
	} = fieldProps
	const { control, formState } = useFormContext()

	return (
		<>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({
					field: { onChange, onBlur, ...field },
					fieldState: { error },
				}) => (
					<TextField
						{...field}
						onChange={e => {
							onChange(e)
							if (onChangeApi) onChangeApi(e)
						}}
						onBlur={() => {
							onBlur()
							if (onBlurApi) onBlurApi()
						}}
						error={!!error}
						{...other}
					/>
				)}
			/>
			<ErrorMessage
				errors={formState.errors}
				name={name}
				render={({ messages }) => {
					let allMessages: string[] = []
					if (messages)
						Object.entries(messages).forEach(message => {
							if (
								message[1] !== undefined &&
								typeof message[1] !== 'boolean'
							)
								allMessages = allMessages.concat(message[1])
						})

					if (messages)
						return (
							<ul>
								{Object.entries(allMessages).map(([index, message]) => (
									<li key={index}>
										<Typography fontSize='small' color='error'>
											{message}
										</Typography>
									</li>
								))}
							</ul>
						)
					return null
				}}
			/>
		</>
	)
}

// eslint-disable-next-line no-unused-vars
type TPasswordFieldProps = {
	showPassword: boolean
	handleClickShowPassword: () => void
}

// eslint-disable-next-line no-unused-vars
type TFormInput = {
	name: string
	label: string
}

const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
	event.preventDefault()
}

const FormPasswordField = (props: any) => {
	const {
		name,
		label,
		showPassword,
		onClickShowPassword: handleClickShowPassword,
		rules,
		onChange: onChangeApi,
		onBlur: onBlurApi,
		autoComplete,
		...other
	} = props
	const { control, formState } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { onChange, onBlur, ...field },
				fieldState: { error },
			}) => (
				<FormControl {...other}>
					<InputLabel color={error ? 'error' : 'primary'} shrink={true}>
						{label}
					</InputLabel>
					<OutlinedInput
						{...field}
						autoComplete={autoComplete}
						notched={true}
						onChange={e => {
							onChange(e)
							if (onChangeApi) onChangeApi(e)
						}}
						onBlur={() => {
							onBlur()
							if (onBlurApi) onBlurApi()
						}}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label={label}
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label={label}
						error={!!error}
						{...other}
					/>
					<ErrorMessage
						errors={formState.errors}
						name={name}
						render={({ messages }) => {
							let allMessages: string[] = []
							if (messages)
								Object.entries(messages).forEach(message => {
									if (
										message[1] !== undefined &&
										typeof message[1] !== 'boolean'
									)
										allMessages = allMessages.concat(message[1])
								})

							if (messages)
								return (
									<ul>
										{Object.entries(allMessages).map(
											([index, message]) => (
												<li color='error' key={index}>
													<Typography
														fontSize='small'
														color='error'
													>
														{message}
													</Typography>
												</li>
											)
										)}
									</ul>
								)
							return null
						}}
					/>
				</FormControl>
			)}
		/>
	)
}
const FormCheckbox = (props: any) => {
	const { name, label, ...other } = props
	const { control } = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControlLabel
					sx={{ m: 1 }}
					label={
						<Typography style={{ fontSize: '.8em' }}>{label}</Typography>
					}
					control={<Checkbox {...field} {...other} />}
				/>
			)}
		/>
	)
}
export { FormTextField, FormSlider, FormPasswordField, FormCheckbox }
