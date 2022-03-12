import React, { useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Slider from '@mui/material/Slider'

import SexFormControl from 'SexFormControl'
import CoupleStats from 'CoupleStats'
import { CoupleContext } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'

import { Couple, Person } from 'life'
// eslint-disable-next-line no-unused-vars
import ActuaryHelp from 'ActuaryHelp'

function Actuary() {
	const { couple, setCouple } = useContext(CoupleContext)
	const { annuityConfig, setAnnuityConfig } = useContext(AnnuityContext)

	const clearCalculatedData = () => {
		setAnnuityConfig({
			...annuityConfig,
			isCalculated: defaultAnnuityConfig.isCalculated,
			totalAjustedValue: defaultAnnuityConfig.totalAjustedValue,
			totalPaymentsReceived: defaultAnnuityConfig.totalPaymentsReceived,
			valueOfGuarantee: defaultAnnuityConfig.valueOfGuarantee,
			payments: defaultAnnuityConfig.payments,
		})
	}

	const handleTargetAgeSliderChange = (
		event: Event,
		newValue: number | number[]
	) => {
		const age = newValue as number
		const copyCouple = new Couple({
			...couple,
			targetAge: age,
		})

		setCouple(copyCouple)
	}

	const handleSliderChangeCommitted = (): void => {
		clearCalculatedData()
	}

	const handleAge1SliderChange = (
		event: Event,
		newValue: number | number[]
	) => {
		const age = newValue as number
		const person1 = new Person({ ...couple.person1, age })
		const copyCouple = new Couple({
			...couple,
			person1,
		})

		setCouple(copyCouple)
	}

	const handleAge2SliderChange = (
		event: Event,
		newValue: number | number[]
	) => {
		const age = newValue as number
		const person2 = new Person({ ...couple.person2, age })

		const copyCouple = new Couple({
			...couple,
			person2,
		})

		setCouple(copyCouple)
	}

	const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'spouse1') {
			const person1 = new Person({
				...couple.person1,
				sex: event.target.value,
			})
			const copyCouple = new Couple({
				...couple,
				person1,
			})
			setCouple(copyCouple)
		} else {
			const person2 = new Person({
				...couple.person2,
				sex: event.target.value,
			})
			const copyCouple = new Couple({
				...couple,
				person2,
			})
			setCouple(copyCouple)
		}

		clearCalculatedData()
	}

	return (
		<Grid id='page' container direction='row' sx={{ marginTop: '70px' }}>
			<Grid id='left-side' item xs={12} sm={12} md={6} lg={5} xl={4}>
				<Grid container direction='column'>
					<Grid id='spouses' item>
						<Grid
							container
							direction='row'
							justifyContent='flex-start'
							spacing={0.25}
						>
							<Grid id='spouse1' item xs={12} sm={12} lg={6}>
								<Box sx={{}}>
									<Typography variant='body2' fontWeight='bold'>
										Step 1: Set sex and age of first spouse
									</Typography>
									<Grid
										container
										direction='row'
										justifyContent='flex-start'
										spacing={2}
									>
										<Grid item>
											<SexFormControl
												value={couple.person1.sex}
												onChange={handleSexChange}
												name='spouse1'
											/>
										</Grid>
									</Grid>
									<Grid container spacing={2} alignItems='center'>
										<Grid item xs>
											<Slider
												max={100}
												min={20}
												name='spouse1'
												valueLabelDisplay='auto'
												value={
													typeof couple.person1.age === 'number'
														? couple.person1.age
														: 0
												}
												onChange={handleAge1SliderChange}
												onChangeCommitted={
													handleSliderChangeCommitted
												}
												aria-labelledby='input-slider'
											/>
										</Grid>
										<Grid item xs={3}>
											<Typography variant='body2' fontWeight='bold'>
												Age: {couple.person1.age}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</Grid>
							<Grid id='spouse2' item xs>
								<Box sx={{}}>
									<Typography variant='body2' fontWeight='bold'>
										Step 2: Set sex and age of second spouse
									</Typography>
									<SexFormControl
										value={couple.person2.sex}
										onChange={handleSexChange}
										name='spouse2'
									/>

									<Grid container spacing={2} alignItems='center'>
										<Grid item xs>
											<Slider
												max={100}
												min={20}
												valueLabelDisplay='auto'
												value={
													typeof couple.person2.age === 'number'
														? couple.person2.age
														: 0
												}
												onChange={handleAge2SliderChange}
												onChangeCommitted={
													handleSliderChangeCommitted
												}
												aria-labelledby='input-slider'
											/>
										</Grid>

										<Grid item xs={3}>
											<Typography variant='body2' fontWeight='bold'>
												Age: {couple.person2.age}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					</Grid>
					<Grid id='target-desc'>
						<Typography variant='body2' fontWeight='bold'>
							Step 3: (Optional) Set target longevity
						</Typography>
					</Grid>
					<Grid id='target' item>
						<Grid container spacing={2} alignItems='center'>
							<Grid id='target-slider' item xs>
								<Slider
									valueLabelDisplay='auto'
									max={100}
									min={20}
									value={
										typeof couple.targetAge === 'number'
											? couple.targetAge
											: 0
									}
									onChange={handleTargetAgeSliderChange}
									onChangeCommitted={handleSliderChangeCommitted}
									aria-labelledby='input-slider'
								/>
							</Grid>
							<Grid item xs={3} sx={{}}>
								<Typography variant='body2' fontWeight='bold'>
									Age: {couple.targetAge}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid id='target-desc'>
						<Typography variant='body2' fontWeight='bold'>
							Step 4: View odds of living pastyour target
						</Typography>
					</Grid>

					<Grid id='couple-stats' item xs>
						<CoupleStats />
					</Grid>
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
					<ActuaryHelp />
				</Box>
			</Grid>
		</Grid>
	)
}

export default Actuary
