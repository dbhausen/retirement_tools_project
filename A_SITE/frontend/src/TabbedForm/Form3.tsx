import * as React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { TForm3, TStore, page3 } from './FormTypes'
import { FormTextField } from '../FormComponents/MuiHookFormInput'

const Form3 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm3>
}) => {
	const rhf = useForm({
		defaultValues: store,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: zodResolver(page3),
	})

	const handleSubmitReset = (data: TForm3) => {
		onSubmit(data)
		rhf.reset(data)
	}
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(handleSubmitReset)}>
				<Stack spacing={1.2} width={300}>
					<FormTextField
						name='page3.color'
						label='Color'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button
						type='button'
						onClick={() => {
							rhf.reset({
								...store,
							})
						}}
					>
						reset
					</Button>

					<Button type='submit'>validate page 3</Button>
					<DevTool control={rhf.control} />
				</Stack>
			</form>
		</FormProvider>
	)
}

export default Form3
