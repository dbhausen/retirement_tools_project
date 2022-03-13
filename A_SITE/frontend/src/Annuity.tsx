import * as React from 'react'

import { NumberTextField, PercentTextField } from 'NumberTextField'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography,
} from '@mui/material'
import { useContext } from 'react'
import { CoupleContext, displayCurrency } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'
import AnnuityHelp from 'AnnuityHelp'
import DeferFormControl from 'DeferralFormControl'

const Annuity = () => {
	const { couple } = useContext(CoupleContext)
	const { annuityConfig, setAnnuityConfig } = useContext(AnnuityContext)

	const calculateValue = (withGurantee: boolean, deferral: number): any => {
		const startAge = couple.getAgeOfYoungest() + 1
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
		let totalAjustedValue = amt
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
				couple.getProbabilityOfAtLeastOneReachingTargetAge(age)
			actuarialAmt = discountedAmt * mortalityDiscount
			escalator *= colaRate + 1
			discounter *= discountRate + 1
			if (age >= deferral) {
				if (age < couple.targetAge) totalPaymentsReceived += escalatedAmt
				totalAjustedValue += actuarialAmt
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
				})
			}
		}
		// valueOfGuarantee is based on possibly receicing a portion of the
		// totalAdjustedValue back as a lump sum in some future period
		// in real life this would be based on the cost not the value
		let unRepaid = totalAjustedValue

		for (let index = 0; index < payments.length; index += 1) {
			const element = payments[index]
			if (withGurantee) {
				unRepaid =
					unRepaid > element.payment ? unRepaid - element.payment : 0
				const spouse1Dead = couple.person1.getProbabilityOfDeathByAge(
					element.spouse1Age
				)
				const spouse1Alive = 1 - spouse1Dead
				let spouse2Dead = couple.person2.getProbabilityOfDeathByAge(
					element.spouse2Age
				)
				let spouse2Alive = 1 - spouse2Dead
				const spouse1Dies = couple.person1.getProbabilityOfDeathAtAge(
					element.spouse1Age
				)
				const spouse2Dies = couple.person2.getProbabilityOfDeathAtAge(
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
			totalAjustedValue,
			payments,
		}
	}
	const handleClick = () => {
		setAnnuityConfig({
			...annuityConfig,
			...calculateValue(annuityConfig.guatantee[0], annuityConfig.deferral),
		})
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'guatantee') {
			setAnnuityConfig({
				...annuityConfig,
				isCalculated: defaultAnnuityConfig.isCalculated,
				totalAjustedValue: defaultAnnuityConfig.totalAjustedValue,
				totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
				valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
				payments: defaultAnnuityConfig.payments,
				[event.target.name]: [event.target.checked, event.target.checked],
			})
		} else {
			setAnnuityConfig({
				...annuityConfig,
				isCalculated: defaultAnnuityConfig.isCalculated,
				totalAjustedValue: defaultAnnuityConfig.totalAjustedValue,
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
			totalAjustedValue: defaultAnnuityConfig.totalAjustedValue,
			totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
			valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
			payments: defaultAnnuityConfig.payments,
			deferral: Number(event.target.value),
		})
	}

	return (
		<Grid id='page' container direction='row' sx={{ marginTop: '70px' }}>
			<Grid id='left-side' item xs={12} sm={12} md={6} lg={5} xl={4}>
				<Grid container direction='column'>
					<Grid id='calculatedResults'>
						<Grid container direction='row'>
							<Grid item xs={7}>
								Value of Payments
							</Grid>
							<Grid item xs textAlign='right'>
								{displayCurrency(annuityConfig.totalAjustedValue)}
							</Grid>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={7}>
								Value of Gurantee
							</Grid>
							<Grid item xs textAlign='right'>
								{displayCurrency(annuityConfig.valueOfGuarantee)}
							</Grid>
						</Grid>
						<Grid container direction='row'>
							<Grid item xs={7}>
								Total Value
							</Grid>
							<Grid item xs textAlign='right'>
								{displayCurrency(
									annuityConfig.valueOfGuarantee +
										annuityConfig.totalAjustedValue
								)}
							</Grid>
						</Grid>
					</Grid>
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
						label='Risk-Free Rate Of Return'
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
					<DeferFormControl
						label='Defer:'
						name='defer'
						onChange={handleDeferralChange}
						value={annuityConfig.deferral}
					/>
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
			<Grid id='right-side-charts' item xs>
				<Box
					sx={{
						display: {
							xl: 'block',
							lg: 'block',
							md: 'block',
							sm: 'block',
							xs: 'none',
						},
						width: '100%',
						height: 400,
					}}
				>
					<AnnuityHelp />
				</Box>
			</Grid>
		</Grid>
	)
}

export default Annuity
