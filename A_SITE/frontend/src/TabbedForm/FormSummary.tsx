import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { TStore, newStore } from './FormTypes'

const FormSummary = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TStore>
}) => {
	const { handleSubmit, control } = useForm({
		defaultValues: store,
		resolver: zodResolver(newStore),
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Button type='submit'>Validate All and Save</Button>
			<DevTool control={control} />
		</form>
	)
}

export default FormSummary
