import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { TForm2, TStore, page2 } from './FormTypes'

const Form2 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm2>
}) => {
	const { handleSubmit, register, control } = useForm({
		defaultValues: store,
		resolver: zodResolver(page2),
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input placeholder='age' {...register('page2.age')} />
			<button type='submit'>validate page 2</button>
			<DevTool control={control} />
		</form>
	)
}
export default Form2
