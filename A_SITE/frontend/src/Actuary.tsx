import React, { useContext, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Slider from '@mui/material/Slider'

import SexFormControl from 'SexFormControl'
import CoupleStats from 'CoupleStats'
import { CoupleContext } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'

const data02 = [
	{ name: 'Neither', value: 90 },
	{ name: 'One', value: 25 },
	{ name: 'Both', value: 15 },
]

function Actuary() {
	const { couple, setCouple } = useContext(CoupleContext)
	const { annuityConfig, setAnnuityConfig } = useContext(AnnuityContext)

	// const [couple.person1.age, setcouple.person1.age] = useState<number>(couple.person1.age)
	// const [couple.person1.sex, setcouple.person1.sex] = useState<string>(couple.person1.sex)

	// const [couple.person2.age, setcouple.person2.age] = useState<number>(couple.person2.age)
	// const [couple.person2.sex, setcouple.person2.sex] = useState<string>(couple.person2.sex)

	const [survivalData, setSurvivalData] = useState(data02)

	const upDateSurvivalData = (age: number) => {
		const newSurvivalData = [
			{
				name: 'Neither',
				value: couple.getProbabilityOfNeitherReachingTargetAge(age),
			},
			{
				name: 'One',
				value: couple.getProbabilityOfExactlyOneReachingTargetAge(age),
			},
			{
				name: 'Both',
				value: couple.getProbabilityOfBothReachingTargetAge(age),
			},
		]

		setSurvivalData(newSurvivalData)
		setAnnuityConfig({
			...annuityConfig,
			isCalculated: defaultAnnuityConfig.isCalculated,
			costOfLivingAdjustment: defaultAnnuityConfig.costOfLivingAdjustment,
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
		couple.targetAge = age
		setCouple(couple)
		upDateSurvivalData(age)
	}
	// event: React.SyntheticEvent | Event,
	// value: number | Array<number>

	const handleSliderChangeCommitted = (): void => {
		upDateSurvivalData(couple.targetAge)
	}

	const handleAge1SliderChange = (
		event: Event,
		newValue: number | number[]
	) => {
		const age = newValue as number

		couple.person1.setAge(age)
		setCouple(couple)
		upDateSurvivalData(couple.targetAge)

		// setcouple.person1.age(age)
	}

	const handleAge2SliderChange = (
		event: Event,
		newValue: number | number[]
	) => {
		const age = newValue as number

		couple.person2.setAge(age)
		setCouple(couple)
		upDateSurvivalData(couple.targetAge)
	}

	const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'spouse1') {
			couple.person1.sex = event.target.value
		} else {
			couple.person2.sex = event.target.value
		}
		setCouple(couple)
		upDateSurvivalData(couple.targetAge)
	}

	return (
		<Grid id='page' container direction='row' sx={{ marginTop: '70px' }}>
			<Grid id='left-side' item xs={12} sm={12} md={7} lg={6} xl={6}>
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
							Step 3: (Optional) Set taget longevity
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
							Step 4: View odds of out-living your assets
						</Typography>
					</Grid>

					<Grid id='couple' item>
						<Grid container direction='row'>
							<Grid id='couple-stats' item xs>
								<CoupleStats
									us={couple}
									targetAge={couple.targetAge}
									survivalData={survivalData}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid id='right-side-charts' item xs={12} sm={12} md={5} lg={6} xl={6}>
				<Box
					sx={{
						width: '100%',
						//   height: 400,
						backgroundColor: 'primary.dark',
						'&:hover': {
							backgroundColor: 'primary.main',
							opacity: [0.9, 0.8, 0.7],
						},
					}}
				/>
			</Grid>
		</Grid>
	)
}

export default Actuary
