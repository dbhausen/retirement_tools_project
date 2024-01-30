import { useMemo } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { IconContext } from 'react-icons'
import { FormTextField } from '../FormComponents/MuiHookFormInput'
import { TForm2, TStore, page2 } from './FormTypes'

const Form2 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm2>
}) => {
	const rhf = useForm({
		defaultValues: store,
		criteriaMode: 'all',
		mode: 'onChange',
		resolver: zodResolver(page2),
	})

	const IconParms = useMemo(() => ({ size: '2rem', color: 'blue' }), [])

	const handleSubmitReset = (data: TForm2) => {
		onSubmit(data)
		rhf.reset(data)
	}

	return (
		<IconContext.Provider value={IconParms}>
			<FormProvider {...rhf}>
				<form onSubmit={rhf.handleSubmit(handleSubmitReset)}>
					<Stack spacing={1.2} width={300}>
						<FormTextField
							name='page2.age'
							label='Age'
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
						<Button type='submit'>validate page 2</Button>
					</Stack>
					<DevTool control={rhf.control} />
				</form>
			</FormProvider>
		</IconContext.Provider>
	)
}
export default Form2
