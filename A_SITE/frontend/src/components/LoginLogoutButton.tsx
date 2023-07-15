/* eslint-disable no-unused-vars */

/* eslint-disable react/jsx-handler-names */
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import {
	Button,
	Checkbox,
	Dialog,
	DialogTitle,
	FormControlLabel,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { UserContext } from '../contexts/UserContext'
import axiosHttp from './axiosHttp'
import PasswordField from './PasswordField'
import ErrorMessageList from './ErrorMessageList'
import MuiHookForm from '../FormComponents/MuiHookForm'

interface SimpleDialogProps {
	open: boolean
	handleClose: () => void
}
type Inputs = {
	example: string
	exampleRequired: string
}

const LoginDialog = (props: SimpleDialogProps) => {
	const { open, handleClose } = props
	const { setUser } = useContext(UserContext)
	const [password, setPassword] = useState('MuskieWaters')
	const [password2, setPassword2] = useState('MuskieWaters')
	const [username, setUsername] = useState('david')
	const [registerChecked, setRegisterChecked] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [messageList, setMessageList] = useState<string[]>([])
	const [passwordValidLength, setPasswordValidLength] = useState(false)
	const [passwordValidCaps, setPasswordValidCaps] = useState(false)
	const [passwordValidDiff, setPasswordValidDiff] = useState(false)
	const [passwordValidRepeat, setPasswordValidRepeat] = useState(false)
	const [passwordValidAll, setPasswordValidAll] = useState(false)
	const [password2Match, setPassword2Match] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [formValid, setFormValid] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const validatePassword2 = (
		newPassword?: string,
		newPassword2?: string
	): boolean => {
		const np = newPassword === undefined ? password : newPassword
		const np2 = newPassword2 === undefined ? password2 : newPassword2
		const pwMatch = np === np2
		setPassword2Match(pwMatch)
		setFormValid(pwMatch)
		return pwMatch
	}

	const validatePassword = (newPassword?: string, name?: string): boolean => {
		const regexLower = /(?=.*[a-z])/
		const regexUpper = /(?=.*[A-Z])/
		const regexRepeat = /(.)\1{3,}/
		const np = newPassword === undefined ? password : newPassword
		const testname = name === undefined ? username : name
		const allTest =
			!regexRepeat.test(np) &&
			regexUpper.test(np) &&
			regexLower.test(np) &&
			!np.toLowerCase().includes(testname.toLowerCase()) &&
			np.length > 6

		setPasswordValidRepeat(!regexRepeat.test(np))
		setPasswordValidCaps(regexUpper.test(np) && regexLower.test(np))
		setPasswordValidDiff(!np.toLowerCase().includes(testname.toLowerCase()))
		setPasswordValidLength(np.length > 6)
		setPasswordValidAll(allTest)
		setFormValid(validatePassword2(np) && allTest)

		return allTest
	}

	const handleChangeRegisterChecked = () => {
		setRegisterChecked(!registerChecked)
		validatePassword()
		validatePassword2()
	}

	const cleanupAndClose = () => {
		setMessageList([])
		setRegisterChecked(false)
		handleClose()
	}

	const validateAndSetPassword = (newPassword: string) => {
		validatePassword(newPassword)
		setPassword(newPassword)
	}

	const validateAndSetPassword2 = (newPassword: string) => {
		validatePassword2(password, newPassword)
		setPassword2(newPassword)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!registerChecked) {
			axiosHttp
				.post('/polls/login/', {
					username,
					password,
				})
				.then(response => {
					setUser({ name: response.data.username, isLoggedIn: true })
					cleanupAndClose()
				})
				.catch(error => {
					// eslint-disable-next-line no-console
					console.log(error)
				})
			axiosHttp
				.get('/polls/validatorHelp/')
				.then(response => {
					// eslint-disable-next-line no-console
					console.log(response.data)
				})
				.catch(() => {
					// do something
				})
		} else {
			axiosHttp
				.post('/polls/register/', {
					username,
					password,
					password2,
				})
				.then(response => {
					setUser({ name: response.data.username, isLoggedIn: true })
					cleanupAndClose()
				})
				.catch(error => {
					if (error.customName === 'AxiosRegistrationError')
						setMessageList(error.messageList)
				})
		}
	}

	return (
		<Dialog onClose={cleanupAndClose} open={open}>
			<DialogTitle>
				{registerChecked ? 'New User Login' : 'Login'}
			</DialogTitle>
			<MuiHookForm />

			<form onSubmit={handleSubmit}>
				<br />
				<TextField
					sx={{ m: 1, width: '90%' }}
					id='username'
					label='Username'
					autoComplete='username'
					value={username}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setUsername(event.target.value)
						validatePassword(password, event.target.value)
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<br />

				<br />
				{registerChecked ? (
					<div>
						<div>
							<PasswordField
								sx={{ m: 1, width: '90%' }}
								variant='outlined'
								label='Password'
								id='Password'
								error={!passwordValidAll}
								autoComplete='current-password'
								password={password}
								setPassword={validateAndSetPassword}
								showPassword={showPassword}
								handleClickShowPassword={handleClickShowPassword}
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
											<ErrorOutlineIcon
												color='error'
												fontSize='small'
											/>
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
											<ErrorOutlineIcon
												color='error'
												fontSize='small'
											/>
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
											<ErrorOutlineIcon
												color='error'
												fontSize='small'
											/>
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
											<ErrorOutlineIcon
												color='error'
												fontSize='small'
											/>
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
						</div>
						<PasswordField
							sx={{ m: 1, width: '90%' }}
							variant='outlined'
							label='Re-enter password'
							id='rePassword'
							autoComplete='off'
							password={password2}
							error={!password2Match}
							setPassword={validateAndSetPassword2}
							showPassword={showPassword}
							handleClickShowPassword={handleClickShowPassword}
						/>
						<div>validations</div>
					</div>
				) : (
					<PasswordField
						sx={{ m: 1, width: '90%' }}
						variant='outlined'
						label='Password'
						id='Password'
						error={false}
						autoComplete='current-password'
						password={password}
						setPassword={validateAndSetPassword}
						showPassword={showPassword}
						handleClickShowPassword={handleClickShowPassword}
					/>
				)}
				<br />

				<Button type='submit'>Submit</Button>

				<Button onClick={() => cleanupAndClose()}>Cancel</Button>
				<br />
				<FormControlLabel
					sx={{ m: 1 }}
					label={
						<Typography style={{ fontSize: '.8em' }}>
							Not Registered? Register now!
						</Typography>
					}
					control={
						<Checkbox
							checked={registerChecked}
							onChange={handleChangeRegisterChecked}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
				/>
			</form>
			<ErrorMessageList messages={messageList} />
		</Dialog>
	)
}

const LoginLogoutButton = (props: any) => {
	const { user, setUser } = useContext(UserContext)
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleClick = () => {
		if (!user.isLoggedIn) {
			handleClickOpen()
		} else {
			axiosHttp.post('/polls/logout/').then(() => {
				setUser({ name: '', isLoggedIn: false })
			})
		}
	}

	return (
		<div>
			<IconButton {...props} onClick={handleClick}>
				{user.name}
				{user.isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
			</IconButton>
			<LoginDialog open={open} handleClose={handleClose} />
		</div>
	)
}

export default LoginLogoutButton
