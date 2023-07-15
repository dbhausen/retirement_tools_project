import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { TForm3, TStore, page3 } from './FormTypes'

const Form3 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm3>
}) => {
	const { handleSubmit, register, control } = useForm({
		defaultValues: store,
		resolver: zodResolver(page3),
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input placeholder='color' {...register('page3.color')} />
			<button type='submit'>validate page 3</button>
			<DevTool control={control} />
		</form>
	)
}

export default Form3
