import { useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { TStore, makeModelData, pageSummary } from './FormTypes'
import axiosHttp from '../components/axiosHttp'

const FormSummary = ({
	store,
	onSubmit,
	selectedId,
}: {
	store: TStore
	onSubmit: SubmitHandler<TStore>
	selectedId: number
}) => {
	const { handleSubmit, control } = useForm({
		defaultValues: store,
		resolver: zodResolver(pageSummary),
	})

	const handleUpdateClick = () => {
		axiosHttp
			.put(`/polls/updatejunk/${selectedId}`, makeModelData(store))
			.then(response => {
				// eslint-disable-next-line no-console
				console.log(response)
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}

	const handleOptionsClick = () => {
		axiosHttp
			.get(`/polls/opt/?model=Junk`)
			.then(response => {
				// eslint-disable-next-line no-console
				console.log(response)
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Button type='submit'>Validate All and Save New</Button>
			<Button type='button' onClick={handleUpdateClick}>
				update
			</Button>
			<Button type='button' onClick={handleOptionsClick}>
				options
			</Button>

			<DevTool control={control} />
		</form>
	)
}

export default FormSummary
