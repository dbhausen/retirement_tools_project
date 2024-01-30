import { z } from 'zod'
import r from '../Constants/RegexConstants'

const p1 = z
	.object({
		username: z.string().min(5, 'Too short'),
		password: z
			.string()
			.min(8, 'Too short')
			.regex(r.regexUpper, 'Must have upper case')
			.regex(r.regexLower, 'Must have lower case')
			.regex(r.regexNumberOrSpecial, 'Must have number or !@#$%^&*')
			.regex(r.regexRepeat, 'No repeated characters'),
		password2: z.string(),
	})
	.refine(data => data.password === data.password2, {
		message: 'Passwords must match',
		path: ['password2'],
	})
	.refine(data => !data.password.includes(data.username), {
		message: 'Passwords must not include Username',
		path: ['password'],
	})

const p2 = z.object({
	age: z.coerce.number().min(5, 'too young').multipleOf(2),
})

const p3 = z.object({ color: z.string() })

const p4 = z.object({
	name: z.string(),
	posts: z.array(z.object({ id: z.number(), text: z.string().min(5) })),
})

const page1 = z.object({
	page1: p1,
})
const page2 = z.object({
	page2: p2,
})
const page3 = z.object({
	page3: p3,
})

const page4 = z.object({
	page4: p4,
})

const pageSummary = z.object({
	page1: p1,
	page2: p2,
	page3: p3,
	page4: p4,
})

type TForm1 = z.infer<typeof page1>
type TForm2 = z.infer<typeof page2>
type TForm3 = z.infer<typeof page3>
type TForm4 = z.infer<typeof page4>

type TStore = z.infer<typeof pageSummary>

const formDefaults: TStore = {
	page1: {
		username: 'johnyyy',
		password: 'MuskieWaters1',
		password2: 'MuskieWaters1',
	},
	page2: { age: 20 },
	page3: { color: 'Blue' },
	page4: {
		name: 'Bull',
		posts: [
			{ id: 1, text: 'text 1' },
			{ id: 2, text: 'text 2' },
		],
	},
}

type TModel = {
	user_name: string
	password: string
	age: number
	color: string
	name: string
	posts: { id: number; text: string }[]
}

const makeModelData = (store: TStore): TModel => ({
	user_name: store.page1.username,
	password: store.page1.password,
	age: store.page2.age,
	color: store.page3.color,
	name: store.page4.name,
	posts: store.page4.posts,
})

const readModelData = (model: TModel): TStore => ({
	page1: {
		username: model.user_name,
		password: model.password,
		password2: model.password,
	},
	page2: { age: model.age },
	page3: { color: model.color },
	page4: {
		name: model.name,
		posts: model.posts,
	},
})

export type { TForm1, TForm2, TForm3, TForm4, TStore, TModel }
export {
	formDefaults,
	pageSummary,
	page1,
	page2,
	page3,
	page4,
	makeModelData,
	readModelData,
}
