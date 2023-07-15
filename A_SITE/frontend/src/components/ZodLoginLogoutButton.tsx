import { useContext, useEffect, useState } from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import {
	Button,
	Checkbox,
	Dialog,
	DialogTitle,
	FormControlLabel,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { DevTool } from '@hookform/devtools'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
	FormPasswordField,
	FormTextField,
} from '../FormComponents/MuiHookFormInput'
import r from '../Constants/RegexConstants'
import axiosHttp from './axiosHttp'
import { UserContext } from '../contexts/UserContext'

// eslint-disable-next-line no-unused-vars
const noop = (x?: any) => {}

// eslint-disable-next-line no-unused-vars
interface SimpleDialogProps {
	open: boolean
	// eslint-disable-next-line no-unused-vars
	setOpen: (isOpen: boolean) => void
}

const newUser = z.object({
	username: z.string().min(5, 'min lenght 5').trim(),
	password: z.string().regex(r.regexPassword, 'Password not vaid, too weak.'),
	password2: z.string(),
})

type TNewUser = z.infer<typeof newUser> // string

const RegisterForm = () => {
	const [passwordValidLength, setPasswordValidLength] = useState(false)
	const [passwordValidCaps, setPasswordValidCaps] = useState(false)
	const [passwordValidDiff, setPasswordValidDiff] = useState(false)
	const [passwordValidRepeat, setPasswordValidRepeat] = useState(false)
	const [passwordValidAll, setPasswordValidAll] = useState(false)
	const [password2Match, setPassword2Match] = useState(false)

	const rhf = useForm<TNewUser>({
		resolver: zodResolver(newUser),
		defaultValues: {
			username: '',
			password: '',
			password2: '',
		},
	})

	const [pass1, pass2, user] = rhf.watch(['password', 'password2', 'username'])

	useEffect(() => {
		setPasswordValidRepeat(!r.regexRepeat.test(pass1))
		setPasswordValidCaps(r.regexUpper.test(pass1) && r.regexLower.test(pass1))
		setPasswordValidDiff(!pass1.toLowerCase().includes(user.toLowerCase()))
		setPasswordValidLength(pass1.length > 6)

		const allTest =
			!r.regexRepeat.test(pass1) &&
			r.regexUpper.test(pass1) &&
			r.regexLower.test(pass1) &&
			!pass1.toLowerCase().includes(user.toLowerCase()) &&
			pass1.length > 6

		setPassword2Match(pass1 === pass2 && allTest)

		setPasswordValidAll(rhf.formState.isValid && pass1 === pass2 && allTest)
	}, [pass1, pass2, rhf.formState.isValid, user])

	const [showPassword, setShowPassword] = useState(false)
	const { setUser, setOpen } = useContext(UserContext)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const onSubmit: SubmitHandler<TNewUser> = data => {
		const { username, password, password2 } = data
		axiosHttp
			.post('/polls/register/', {
				username,
				password,
				password2,
			})
			.then(response => {
				setUser({ name: response.data.username, isLoggedIn: true })
				setOpen(false)
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(onSubmit)}>
				<Stack spacing={1}>
					<FormTextField
						name='username'
						label='Username'
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<FormPasswordField
						name='password'
						label='password'
						autoComplete='password'
						showPassword={showPassword}
						onClickShowPassword={handleClickShowPassword}
					/>
					<Grid container sx={{ color: 'text.primary' }}>
						<Grid container direction='row'>
							<Grid item xs={1}>
								{passwordValidLength ? (
									<CheckCircleOutlineIcon
										color='success'
										fontSize='small'
									/>
								) : (
									<ErrorOutlineIcon color='error' fontSize='small' />
								)}
							</Grid>
							<Grid item xs={11}>
								<Typography fontSize='small'>
									{passwordValidLength
										? 'Password is long enough.'
										: 'Password must be at least 7 characters '}
								</Typography>
							</Grid>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={1}>
								{passwordValidRepeat ? (
									<CheckCircleOutlineIcon
										color='success'
										fontSize='small'
									/>
								) : (
									<ErrorOutlineIcon color='error' fontSize='small' />
								)}
							</Grid>
							<Grid item xs={11}>
								<Typography fontSize='small'>
									{passwordValidRepeat
										? 'Password has no excesive repeating.'
										: 'Password has excesive repeating.'}
								</Typography>
							</Grid>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={1}>
								{passwordValidCaps ? (
									<CheckCircleOutlineIcon
										color='success'
										fontSize='small'
									/>
								) : (
									<ErrorOutlineIcon color='error' fontSize='small' />
								)}
							</Grid>
							<Grid item xs={11}>
								<Typography fontSize='small'>
									{passwordValidCaps
										? 'Password has upper and lower case letters.'
										: 'Password must have upper and lower case letters'}
								</Typography>
							</Grid>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={1}>
								{passwordValidDiff ? (
									<CheckCircleOutlineIcon
										color='success'
										fontSize='small'
									/>
								) : (
									<ErrorOutlineIcon color='error' fontSize='small' />
								)}
							</Grid>
							<Grid item xs={11}>
								<Typography fontSize='small'>
									{passwordValidDiff
										? 'Password does not contain username.'
										: 'Password must not contain username.'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<FormPasswordField
						name='password2'
						label='Re-enter Password'
						autoComplete='password'
						showPassword={showPassword}
						onClickShowPassword={handleClickShowPassword}
					/>
					<Grid container direction='row'>
						<Grid item xs={1}>
							{password2Match ? (
								<CheckCircleOutlineIcon
									color='success'
									fontSize='small'
								/>
							) : (
								<ErrorOutlineIcon color='error' fontSize='small' />
							)}
						</Grid>
						<Grid item xs={11}>
							<Typography fontSize='small'>
								{password2Match
									? 'Passwords match.'
									: 'Passwords must be valid and match.'}
							</Typography>
						</Grid>
					</Grid>

					<Button type='submit' disabled={!passwordValidAll}>
						Submit
					</Button>
				</Stack>
			</form>
			<DevTool control={rhf.control} />
		</FormProvider>
	)
}

const user = z.object({
	username: z.string().min(5, 'min lenght 5').trim(),
	password: z.string(),
})

type TUser = z.infer<typeof user> // string

const LoginForm = () => {
	const rhf = useForm<TUser>({
		resolver: zodResolver(user),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const { setUser, setOpen } = useContext(UserContext)
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const isEntireFormValid = () => true

	// eslint-disable-next-line no-console
	const onSubmit: SubmitHandler<TUser> = data => {
		const { username, password } = data
		axiosHttp
			.post('/polls/login/', {
				username,
				password,
			})
			.then(response => {
				setUser({ name: response.data.username, isLoggedIn: true })
				setOpen(false)
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(onSubmit)}>
				<Stack spacing={1}>
					<FormTextField
						name='username'
						label='Username'
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<FormPasswordField
						name='password'
						label='password'
						autoComplete='password'
						showPassword={showPassword}
						onClickShowPassword={handleClickShowPassword}
					/>

					<Button type='submit' disabled={!isEntireFormValid()}>
						Submit
					</Button>
				</Stack>
			</form>
			<DevTool control={rhf.control} />
		</FormProvider>
	)
}

const LoginDialog = (props: any) => {
	const { open, onClose: handleClose } = props
	const [isReg, setIsReg] = useState(false)

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle> {isReg ? 'Login and Register' : 'Login'}</DialogTitle>
			{isReg ? <RegisterForm /> : <LoginForm />}

			<FormControlLabel
				sx={{ m: 1 }}
				label={
					<Typography style={{ fontSize: '.8em' }}>
						Not Registered? Register now!
					</Typography>
				}
				control={
					<Checkbox
						checked={isReg}
						onChange={() => {
							setIsReg(!isReg)
						}}
					/>
				}
			/>
		</Dialog>
	)
}

const ZodLoginLogoutButton = (props: any) => {
	const { open, setOpen } = useContext(UserContext)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		// eslint-disable-next-line no-console
		console.log('handleClose')
		setOpen(false)
	}

	return (
		<div>
			<IconButton {...props} onClick={handleClickOpen}>
				<DeliveryDiningIcon />
			</IconButton>
			<LoginDialog open={open} onClose={handleClose} />
		</div>
	)
}

export default ZodLoginLogoutButton
