import { Box, Grid, Typography } from '@mui/material'
import { Couple } from 'Couple'
import { CoupleContext, displayPercent } from 'CoupleContext'
import { useContext } from 'react'

import { COLORS, COLORS2, MyChart } from './SurvivalPie'

// const displayPercent = (percent: number) => `${(percent * 100).toFixed(2)}%`

function CoupleStats() {
	const { couple } = useContext(CoupleContext)
	return (
		<Box sx={{ paddingRight: '30px' }}>
			<Grid container direction='row'>
				<Grid id='pie-chart' item xs={6} sm={5} md={4}>
					<MyChart />
				</Grid>
				{couple.married ? (
					<Grid
						id='stat-chart'
						item
						xs
						sx={{ marginRight: '5px', marginTop: '25px' }}
					>
						<Grid
							container
							direction='row'
							bgcolor={COLORS[1]}
							alignItems='flex-end'
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography variant='body2' color='white'>
									{`One ${couple.targetAge.toString()}:`}
								</Typography>
							</Grid>
							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									textAlign='right'
									color='white'
								>
									{displayPercent(
										Couple.getProbabilityOfExactlyOneReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							alignItems='flex-end'
							bgcolor={COLORS[2]}
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography variant='body2' color='white'>
									{`Both ${couple.targetAge.toString()}:`}
								</Typography>
							</Grid>
							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									textAlign='right'
									color='white'
								>
									{displayPercent(
										Couple.getProbabilityOfBothReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							bgcolor={COLORS2[1]}
							alignItems='flex-end'
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography color='white' variant='body2'>
									At least one
								</Typography>
							</Grid>
							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									color='white'
									textAlign='right'
								>
									{displayPercent(
										Couple.getProbabilityOfAtLeastOneReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							bgcolor={COLORS[0]}
							alignItems='flex-end'
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography variant='body2' color='white'>
									{`Neither ${couple.targetAge.toString()}:`}
								</Typography>
							</Grid>

							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									color='white'
									textAlign='right'
								>
									{displayPercent(
										Couple.getProbabilityOfNeitherReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				) : (
					<Grid
						id='stat-chart'
						item
						xs
						sx={{ marginRight: '5px', marginTop: '25px' }}
					>
						<Grid
							container
							direction='row'
							bgcolor={COLORS2[1]}
							alignItems='flex-end'
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography color='white' variant='body2'>
									{`Alive at ${couple.targetAge.toString()}:`}
								</Typography>
							</Grid>
							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									color='white'
									textAlign='right'
								>
									{displayPercent(
										Couple.getProbabilityOfAtLeastOneReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							bgcolor={COLORS[0]}
							alignItems='flex-end'
						>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography variant='body2' color='white'>
									Not alive
								</Typography>
							</Grid>

							<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
								<Typography
									variant='body2'
									color='white'
									textAlign='right'
								>
									{displayPercent(
										Couple.getProbabilityOfNeitherReachingTargetAge(
											couple,
											couple.targetAge
										)
									)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default CoupleStats
