import * as React from 'react'

import { NumberTextField, PercentTextField } from 'NumberTextField'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import { useContext } from 'react'
import { CoupleContext, displayCurrency } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'
import AnnuityHelp from 'AnnuityHelp'
import DeferFormControl from 'DeferralFormControl'
import { Couple, Person } from 'Couple'

const Annuity = () => {
	const { couple } = useContext(CoupleContext)
	const { annuityConfig, setAnnuityConfig, setStoredAnnuityConfig } =
		useContext(AnnuityContext)

	const calculateValue = (withGurantee: boolean, deferral: number): any => {
		const startAge = couple.married
			? Couple.getAgeOfYoungest(couple) + 1
			: couple.person1.age + 1
		let spouse1Age = couple.person1.age
		let spouse2Age = couple.person2.age
		const now = new Date()
		let year = now.getFullYear()

		const colaRate = Number(annuityConfig.costOfLivingAdjustment) / 100
		const discountRate = Number(annuityConfig.discountRate) / 100
		const amt = Number(annuityConfig.annuityAmount)
		let escalator = colaRate + 1
		let discounter = discountRate + 1
		let escalatedAmt = amt
		let discountedAmt = amt
		let actuarialAmt = amt
		let totalPaymentsReceived = amt
		let totalAdjustedValue = amt
		let valueOfGuarantee = 0
		let id = 0
		const payments = []

		if (startAge >= deferral) {
			payments.push({
				id,
				year,
				spouse1Age,
				spouse2Age,
				payment: amt,
				discountedAmt,
				actuarialAmt,
				discounter,
				valueOfGuarantee,
				style: 'normal',
			})
		}

		for (let age = startAge; age < 117; age += 1) {
			spouse1Age += 1
			spouse2Age += 1
			year += 1
			id += 1

			escalatedAmt = escalator * amt
			discountedAmt = escalatedAmt / discounter
			const mortalityDiscount =
				Couple.getProbabilityOfAtLeastOneReachingTargetAge(couple, age)
			actuarialAmt = discountedAmt * mortalityDiscount
			escalator *= colaRate + 1
			discounter *= discountRate + 1
			if (age >= deferral) {
				if (age < couple.targetAge) totalPaymentsReceived += escalatedAmt
				totalAdjustedValue += actuarialAmt
				payments.push({
					id,
					year,
					spouse1Age,
					spouse2Age,
					payment: escalatedAmt,
					discountedAmt,
					actuarialAmt,
					discounter,
					valueOfGuarantee,
					style: 'normal',
				})
			}
		}
		// valueOfGuarantee is based on possibly receicing a portion of the
		// totalAdjustedValue back as a lump sum in some future period
		// in real life this would be based on the cost not the value
		let unRepaid = totalAdjustedValue

		for (let index = 0; index < payments.length; index += 1) {
			const element = payments[index]
			if (withGurantee) {
				unRepaid =
					unRepaid > element.payment ? unRepaid - element.payment : 0
				const spouse1Dead = Person.getProbabilityOfDeathByAge(
					couple.person1,
					element.spouse1Age
				)
				const spouse1Alive = 1 - spouse1Dead
				let spouse2Dead = Person.getProbabilityOfDeathByAge(
					couple.person2,
					element.spouse2Age
				)
				let spouse2Alive = 1 - spouse2Dead
				const spouse1Dies = Person.getProbabilityOfDeathAtAge(
					couple.person1,
					element.spouse1Age
				)
				const spouse2Dies = Person.getProbabilityOfDeathAtAge(
					couple.person2,
					element.spouse2Age
				)
				if (!couple.married) {
					spouse2Dead = 1
					spouse2Alive = 0
				}

				// Probability that the last surviving spouse dies in a particular year
				const lastDies =
					spouse1Alive * spouse2Dead * spouse1Dies +
					spouse2Alive * spouse1Dead * spouse2Dies

				// Unrepaid balance discounted for time and odds of it being paid in this year
				valueOfGuarantee += (unRepaid * lastDies) / element.discounter
				element.valueOfGuarantee =
					(unRepaid * lastDies) / element.discounter
			}
		}
		return {
			isCalculated: true,
			valueOfGuarantee,
			totalPaymentsReceived,
			totalAdjustedValue,
			payments,
		}
	}
	const handleClick = () => {
		setAnnuityConfig({
			...annuityConfig,
			...calculateValue(annuityConfig.guatantee[0], annuityConfig.deferral),
		})
		setStoredAnnuityConfig(annuityConfig)
		window.scrollTo(0, 0)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'guatantee') {
			setAnnuityConfig({
				...annuityConfig,
				isCalculated: defaultAnnuityConfig.isCalculated,
				totalAdjustedValue: defaultAnnuityConfig.totalAdjustedValue,
				totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
				valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
				payments: defaultAnnuityConfig.payments,
				[event.target.name]: [event.target.checked, event.target.checked],
			})
		} else {
			setAnnuityConfig({
				...annuityConfig,
				isCalculated: defaultAnnuityConfig.isCalculated,
				totalAdjustedValue: defaultAnnuityConfig.totalAdjustedValue,
				totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
				valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
				payments: defaultAnnuityConfig.payments,
				[event.target.name]: event.target.value,
			})
		}
	}
	const handleDeferralChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAnnuityConfig({
			...annuityConfig,
			isCalculated: defaultAnnuityConfig.isCalculated,
			totalAdjustedValue: defaultAnnuityConfig.totalAdjustedValue,
			totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
			valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
			payments: defaultAnnuityConfig.payments,
			deferral: Number(event.target.value),
		})
	}

	return (
		<Paper>
			<Grid id='page' container direction='row'>
				<Grid id='left-side' item xs={12} sm={8} md={6} lg={5} xl={4}>
					<Grid container direction='column' sx={{ paddingLeft: '10px' }}>
						<Typography variant='caption'>
							<Grid id='calculatedResults' sx={{ height: 70 }}>
								<Grid container direction='row'>
									<Grid item xs={6}>
										Value of Payments
									</Grid>
									<Grid item xs={3} textAlign='right'>
										{displayCurrency(
											annuityConfig.totalAdjustedValue
										)}
									</Grid>
								</Grid>
								<Grid container direction='row'>
									<Grid item xs={6}>
										Value of Gurantee
									</Grid>
									<Grid item xs={3} textAlign='right'>
										{displayCurrency(annuityConfig.valueOfGuarantee)}
									</Grid>
								</Grid>
								<Grid container direction='row'>
									<Grid item xs={6}>
										Total Value
									</Grid>
									<Grid item xs={3} textAlign='right'>
										{displayCurrency(
											annuityConfig.valueOfGuarantee +
												annuityConfig.totalAdjustedValue
										)}
									</Grid>
								</Grid>
							</Grid>
						</Typography>
						<NumberTextField
							label='Annual Annuity Amount'
							name='annuityAmount'
							prefix='$'
							thousandSeparator
							decimalScale={0}
							fixedDecimalScale={true}
							value={annuityConfig.annuityAmount}
							onChange={handleChange}
							variant='standard'
							allowNegative={false}
						/>
						<PercentTextField
							label='Cost-Of-Living Adjustment'
							name='costOfLivingAdjustment'
							decimalScale={2}
							fixedDecimalScale={true}
							value={annuityConfig.costOfLivingAdjustment}
							onChange={handleChange}
							variant='standard'
							allowNegative={false}
						/>

						<PercentTextField
							InputLabelProps={{ style: { fontSize: 17 } }}
							label='Risk-Free Rate Of Return (see note)'
							name='discountRate'
							decimalScale={2}
							fixedDecimalScale={true}
							value={annuityConfig.discountRate}
							onChange={handleChange}
							variant='standard'
							allowNegative={false}
						/>
						<FormControlLabel
							label={
								<Typography variant='body2' color='textSecondary'>
									Guaranteed Return Of Purchase Price
								</Typography>
							}
							control={
								<Checkbox
									name='guatantee'
									checked={
										annuityConfig.guatantee[0] &&
										annuityConfig.guatantee[1]
									}
									indeterminate={
										annuityConfig.guatantee[0] !==
										annuityConfig.guatantee[1]
									}
									onChange={handleChange}
								/>
							}
						/>
						<Typography variant='caption' color='textSecondary'>
							<DeferFormControl
								label='Defer Until:'
								name='defer'
								onChange={handleDeferralChange}
								value={annuityConfig.deferral}
							/>
						</Typography>
						<Button
							sx={{ width: '50%', alignSelf: 'center' }}
							size='small'
							variant='contained'
							onClick={handleClick}
						>
							Calculate Value
						</Button>
					</Grid>
				</Grid>
				<Grid
					id='right-side-charts'
					item
					xs={12}
					sm={12}
					md={12}
					lg={7}
					xl={8}
				>
					<Box
						sx={{
							display: {
								xl: 'block',
								lg: 'block',
								md: 'block',
								sm: 'block',
								xs: 'block',
							},
							width: '100%',
							height: 400,
						}}
					>
						<AnnuityHelp />
					</Box>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default Annuity
