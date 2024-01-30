import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { DevTool } from '@hookform/devtools'
import { Button, Stack } from '@mui/material'
import { HiOutlinePlusSm, HiOutlineTrash } from 'react-icons/hi'
import { GoProjectSymlink } from 'react-icons/go'
import { FormTextField } from '../FormComponents/MuiHookFormInput'
/* 
const postsSchema = z.object({
	posts: z.array(z.object({ postId: z.string(), text: z.string().min(5) })),
})

type TPost = z.infer<typeof postsSchema>

const postsInitial: TPost['posts'] = [
	{ postId: '1', text: 'text 1' },
	{ postId: '2', text: 'text 2' },
]
 */

const postsSchema = z.object({
	posts: z.array(z.object({ postId: z.string(), text: z.string().min(1) })),
})

type TPost = z.infer<typeof postsSchema>['posts'][number]

const postsInitial: TPost[] = [
	{ postId: '1', text: 'text 1' },
	{ postId: '2', text: 'text 2' },
]
export default function App() {
	// assume this comes from backend
	// const [posts, setPosts] = useState<Post[]>(() => postsInitial)
	const [posts, setPosts] = useState(postsInitial)

	const rhf = useForm({
		defaultValues: { posts },
		criteriaMode: 'all',
		mode: 'onChange',
		resolver: zodResolver(postsSchema),
	})

	const {
		handleSubmit,
		control,
		formState: { isValid, isDirty },
		reset,
	} = rhf

	const { fields, append, remove } = useFieldArray({
		name: 'posts',
		control,
	})

	const isSubmittable = !!isDirty && !!isValid

	return (
		<>
			<FormProvider {...rhf}>
				<form
					onSubmit={handleSubmit(data => {
						// eslint-disable-next-line no-console
						console.log('Data submitted:', data)

						// assume you'd send the request to your backend here
						setPosts(data.posts)

						/*
						 * Reset the default values to our new data.
						 * This is done to "set" the validation to the newly
						 * updated values.
						 * makes untouched and not dirty
						 * See: https://react-hook-form.com/api/useform/reset
						 */
						reset(data)
					})}
				>
					<Stack spacing={1.2} width={300}>
						{fields.map((field, index) => (
							//					const errorForField = errors?.posts?.[index]?.text

							<div key={field.id}>
								<p>Post ID: {field.postId}</p>
								<FormTextField
									name={`posts.${index}.text` as const}
									label={`posts.${index}.text` as const}
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
									postId: 'new',
									text: '',
								})
							}
						>
							Append
						</Button>

						<Button
							disabled={!isSubmittable}
							type='submit'
							endIcon={<GoProjectSymlink />}
						>
							Submit
						</Button>

						<DevTool control={control} />
					</Stack>
				</form>
			</FormProvider>
			<h2>Posted data</h2>
			<ul>
				{posts.map(post => (
					<li key={post.postId}>{post.text}</li>
				))}
			</ul>
		</>
	)
}
