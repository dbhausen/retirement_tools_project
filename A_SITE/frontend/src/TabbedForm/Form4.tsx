import * as React from 'react'
import {
	useForm,
	SubmitHandler,
	FormProvider,
	useFieldArray,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { HiOutlinePlusSm, HiOutlineTrash } from 'react-icons/hi'
import { FormTextField } from '../FormComponents/MuiHookFormInput'
import { TForm4, TStore, page4 } from './FormTypes'

const Form1 = ({
	store,
	onSubmit,
}: {
	store: TStore
	onSubmit: SubmitHandler<TForm4>
}) => {
	const rhf = useForm({
		defaultValues: store,
		criteriaMode: 'all',
		mode: 'onChange',
		resolver: zodResolver(page4),
	})

	const { fields, append, remove } = useFieldArray({
		name: 'page4.posts',
		control: rhf.control,
	})

	const handleSubmitReset = (data: TForm4) => {
		onSubmit(data)
		rhf.reset(data)
	}

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(handleSubmitReset)}>
				<Stack spacing={1} width={300}>
					<FormTextField
						name={`page4.name` as const}
						label={`page4.name` as const}
						placeholder='Enter a text..'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					{fields.map((field, index) => (
						<div key={field.id}>
							<p>Post ID: {field.id}</p>
							<FormTextField
								name={`page4.posts.${index}.text` as const}
								label={`page4.posts.${index}.text` as const}
								placeholder='Enter a text..'
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<Button
								type='button'
								onClick={() => remove(index)}
								endIcon={<HiOutlineTrash />}
							>
								Delete
							</Button>
						</div>
					))}
					<Button
						type='button'
						endIcon={<HiOutlinePlusSm />}
						onClick={() =>
							append({
								id: 0,
								text: '',
							})
						}
					>
						Append
					</Button>
					<Button type='submit'>validate page 4</Button>
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
					<DevTool control={rhf.control} />
				</Stack>
			</form>
		</FormProvider>
	)
}

export default Form1
