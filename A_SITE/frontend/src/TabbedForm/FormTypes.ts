/* eslint-disable no-unused-vars */
import { number, z } from 'zod'
import r from '../Constants/RegexConstants'

const formDefaults = {
	page1: { username: '', password: '', password2: '' },
	page2: { age: 0 },
	page3: { color: '' },
}

const p1 = z
	.object({
		username: z.string().min(5, 'Too short'),
		password: z
			.string()
			.min(8, 'Too short')
			.regex(r.regexUpper, 'Must have upper case')
			.regex(r.regexLower, 'Must have lower case')
			.regex(r.regexNumberOrSpecial, 'Must have number or !@#$%^&*')
			.regex(r.regexRepeat, 'No repeats'),
		password2: z.string(),
	})
	.refine(data => data.password === data.password2, {
		message: "Passwords don't match",
		path: ['password2'], // path of error
	})
	.refine(data => data.password === data.password2, {
		message: "Passwords don't match",
		path: ['password'], // path of error
	})

const p2 = z.object({
	age: z.coerce.number().min(5, 'too young').multipleOf(2),
})

const p3 = z.object({ color: z.string() })

const page1 = z.object({
	page1: p1,
})
const page2 = z.object({
	page2: p2,
})
const page3 = z.object({
	page3: p3,
})

const newStore = z.object({
	page1: p1,
	page2: p2,
	page3: p3,
})

type TForm1 = z.infer<typeof page1>
type TForm2 = z.infer<typeof page2>
type TForm3 = z.infer<typeof page3>
type TStore = z.infer<typeof newStore>

export type { TForm1, TForm2, TForm3, TStore }
export { formDefaults, newStore, page1, page2, page3 }
