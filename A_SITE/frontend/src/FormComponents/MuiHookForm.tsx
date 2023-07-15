import {
	useForm,
	Controller,
	SubmitHandler,
	FormProvider,
	useWatch,
} from 'react-hook-form'
import { Checkbox, TextField } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from '@hookform/devtools'

import { FormSlider, FormTextField } from './MuiHookFormInput'

type IFormInputs = {
	MyCheckbox: boolean
	email: string
	username: string
	formText: string
	sliderValue: number
}

const MuiHookForm = () => {
	const rhf = useForm<IFormInputs>({
		defaultValues: {
			MyCheckbox: false,
			email: '',
			username: '',
			formText: '',
			sliderValue: 50,
		},
	})

	const [formText, email] = useWatch({
		control: rhf.control,
		name: ['formText', 'email'],
	})

	const isEntireFormValid = (): boolean =>
		rhf.formState.isValid && formText === email

	const { errors } = rhf.formState
	// eslint-disable-next-line no-console
	const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data)

	const handleChange = (event: { target: { name: any; value: any } }) => {
		// rhf.setValue(event.target.name, event.target.value)
		// eslint-disable-next-line no-console
		console.log(event.target.value)
	}
	const handleText1Blur = () => {
		// rhf.setValue(event.target.name, event.target.value)
		// eslint-disable-next-line no-console
		console.log('blur')
	}

	return (
		<FormProvider {...rhf}>
			<div>{rhf.formState.isValid ? 'Valid' : 'Not Valid'}</div>
			<form onSubmit={rhf.handleSubmit(onSubmit)}>
				<Controller
					name='MyCheckbox'
					control={rhf.control}
					rules={{ required: true }}
					render={({ field }) => <Checkbox {...field} />}
				/>
				<input type='submit' disabled={!isEntireFormValid()} />
				<TextField
					label='Email'
					type='email'
					{...rhf.register('email', { required: 'email is required' })}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<FormTextField
					name='formText'
					rules={{ required: 'a label is required' }}
					label='a label'
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleChange}
					onBlur={handleText1Blur}
				/>
				<FormSlider
					name='sliderValue'
					marks={true}
					step={5}
					max={75}
					min={40}
					onChange={handleChange}
				/>
				<Controller
					name='username'
					control={rhf.control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							label='username'
							error={!!error}
							helperText={error ? error?.message : ''}
						/>
					)}
				/>
			</form>
			<DevTool control={rhf.control} />
		</FormProvider>
	)
}
export default MuiHookForm
