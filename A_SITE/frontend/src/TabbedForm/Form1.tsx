import * as React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button, Stack } from '@mui/material'
import {
	FormPasswordField,
	FormTextField,
} from '../FormComponents/MuiHookFormInput'
import { TForm1, TStore, page1 } from './FormTypes'

const Form1 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm1>
}) => {
	const rhf = useForm({
		defaultValues: store,
		criteriaMode: 'all',
		resolver: zodResolver(page1),
	})

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(onSubmit)}>
				<Stack spacing={1.2} width={300}>
					<FormTextField
						name='page1.username'
						label='Username'
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<FormPasswordField
						name='page1.password'
						label='Password'
						autoComplete='password'
						showPassword={showPassword}
						onClickShowPassword={handleClickShowPassword}
					/>

					<FormPasswordField
						name='page1.password2'
						label='Re-enter password'
						autoComplete='password2'
						showPassword={showPassword}
						onClickShowPassword={handleClickShowPassword}
					/>

					<Button type='submit'>validate page 1</Button>

					<DevTool control={rhf.control} />
				</Stack>
			</form>
		</FormProvider>
	)
}

export default Form1
