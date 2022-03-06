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
import { CoupleContext } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'

const displayPercent = (percent: number) => `${(percent * 100).toFixed(0)}%`
const displayFixed = (n: number) => `$${n.toFixed(2)}`

const Annuity = () => {
	const { couple } = useContext(CoupleContext)
	const { annuityConfig, setAnnuityConfig } = useContext(AnnuityContext)

	const calculateValue = (): any => {
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
		const payments = [
			{
				id,
				year,
				spouse1Age,
				spouse2Age,
				payment: amt,
				discountedAmt,
				actuarialAmt,
				discounter,
				valueOfGuarantee,
			},
		]

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
		// valueOfGuarantee is based on possibly receicing a portion of the
		// totalAdjustedValue back as a lump sum in some future period
		// in real life this would be based on the cost not the value
		let unRepaid = totalAjustedValue

		for (let index = 0; index < payments.length; index += 1) {
			const element = payments[index]
			if (annuityConfig.guatantee[0]) {
				unRepaid =
					unRepaid > element.payment ? unRepaid - element.payment : 0
				const spouse1Dead = couple.person1.getProbabilityOfDeathByAge(
					element.spouse1Age
				)
				const spouse2Dead = couple.person2.getProbabilityOfDeathByAge(
					element.spouse2Age
				)
				const spouse1Dies = couple.person1.getProbabilityOfDeathAtAge(
					element.spouse1Age
				)
				const spouse2Dies = couple.person2.getProbabilityOfDeathAtAge(
					element.spouse2Age
				)
				// Probability that the last surviving spouse dies in a particular year
				const lastDies =
					spouse2Dead * spouse1Dies + spouse1Dead * spouse2Dies

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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'guatantee') {
			setAnnuityConfig({
				...annuityConfig,
				isCalculated: defaultAnnuityConfig.isCalculated,
				costOfLivingAdjustment: defaultAnnuityConfig.costOfLivingAdjustment,
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
				costOfLivingAdjustment: defaultAnnuityConfig.costOfLivingAdjustment,
				totalAjustedValue: defaultAnnuityConfig.totalAjustedValue,
				totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
				valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
				payments: defaultAnnuityConfig.payments,
				[event.target.name]: event.target.value,
			})
		}
	}

	const handleClick = () => {
		setAnnuityConfig({
			...annuityConfig,
			...calculateValue(),
		})
	}

	return (
		<Grid
			container
			direction='column'
			sx={{
				marginTop: '70px',
				'& > :not(style)': {
					m: 1,
				},
			}}
		>
			<Grid item>
				<Box sx={{ p: 1, border: '1px solid grey', borderRadius: 1 }}>
					<Grid container direction='column'>
						<Grid>
							<Typography variant='caption'>
								{`${couple.person1.sex}, Age ${
									couple.person1.age
								} (Estimated life span  ${couple.person1.getLifeExpectancy()})`}
							</Typography>
						</Grid>
						<Grid>
							<Typography variant='caption'>
								{` ${couple.person2.sex}, Age ${
									couple.person2.age
								} (Estimated life span  ${couple.person2.getLifeExpectancy()})`}
							</Typography>
						</Grid>
						<Grid>
							<Typography variant='caption'>
								{`Odds of at leat one reaching age ${
									couple.targetAge
								} are ${displayPercent(
									couple.getProbabilityOfAtLeastOneReachingTargetAge(
										couple.targetAge
									)
								)}`}
							</Typography>
						</Grid>
					</Grid>
				</Box>
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

			<Grid item>
				<Grid container direction='row'>
					<Grid item xs={6}>
						<PercentTextField
							InputLabelProps={{ style: { fontSize: 17 } }}
							label='Risk free rate of return'
							name='discountRate'
							decimalScale={2}
							fixedDecimalScale={true}
							value={annuityConfig.discountRate}
							onChange={handleChange}
							variant='standard'
							allowNegative={false}
						/>
					</Grid>
					<Grid item xs>
						<PercentTextField
							label='Cost Of Living Adjustment'
							name='costOfLivingAdjustment'
							decimalScale={2}
							fixedDecimalScale={true}
							value={annuityConfig.costOfLivingAdjustment}
							onChange={handleChange}
							variant='standard'
							allowNegative={false}
						/>
					</Grid>
				</Grid>
			</Grid>
			<FormControlLabel
				sx={{ fontStyle: 'italic' }}
				label='Guranteed of return of payment'
				control={
					<Checkbox
						name='guatantee'
						checked={
							annuityConfig.guatantee[0] && annuityConfig.guatantee[1]
						}
						indeterminate={
							annuityConfig.guatantee[0] !== annuityConfig.guatantee[1]
						}
						onChange={handleChange}
					/>
				}
			/>
			<Button size='small' variant='contained' onClick={handleClick}>
				Calculate Value
			</Button>
			{annuityConfig.isCalculated ? (
				<Grid id='calculatedResults'>
					<Grid container direction='row'>
						<Grid item xs={7}>
							Total Payments received by age: {couple.targetAge}
						</Grid>

						<Grid xs textAlign='right'>
							{displayFixed(annuityConfig.totalPaymentsReceived)}
						</Grid>
					</Grid>
					<Grid container direction='row'>
						<Grid item xs={7}>
							Total Adjusted Value of payments
						</Grid>
						<Grid xs textAlign='right'>
							{displayFixed(annuityConfig.totalAjustedValue)}
						</Grid>
					</Grid>
					<Grid container direction='row'>
						<Grid item xs={7}>
							Value of Gurantee
						</Grid>
						<Grid xs textAlign='right'>
							{displayFixed(annuityConfig.valueOfGuarantee)}
						</Grid>
					</Grid>
					<Grid container direction='row'>
						<Grid item xs={7}>
							Total Value
						</Grid>
						<Grid item xs textAlign='right'>
							{displayFixed(
								annuityConfig.valueOfGuarantee +
									annuityConfig.totalAjustedValue
							)}
						</Grid>
					</Grid>
				</Grid>
			) : null}
		</Grid>
	)
}

export default Annuity
