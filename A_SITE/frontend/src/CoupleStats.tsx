import { Grid, Link, Typography } from '@mui/material'

import { COLORS, COLORS2, MyChart } from './SurvivalPie'

const displayPercent = (percent: number) => `${(percent * 100).toFixed(2)}%`

interface IProps {
	survivalData: any
	targetAge: number
	us: any
}
// https://www.ssa.gov/oact/STATS/table4c6.html

function CoupleStats(props: IProps) {
	const { survivalData, targetAge, us } = props
	return (
		<Grid container direction='column'>
			<Grid
				container
				direction='row'
				alignItems='flex-start'
				alignContent='space-between'
			>
				<Grid id='pie-chart' item xs={6}>
					<MyChart data={survivalData} />
				</Grid>
				<Grid id='stat-chart' item xs sx={{ marginTop: '25px' }}>
					<Grid
						container
						direction='row'
						bgcolor={COLORS[1]}
						alignItems='flex-start'
					>
						<Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
							<Typography variant='body2' color='white'>
								{`One ${targetAge.toString()}:`}
							</Typography>
						</Grid>
						<Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
							<Typography variant='body2' textAlign='right' color='white'>
								{displayPercent(
									us.getProbabilityOfExactlyOneReachingTargetAge(targetAge)
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
						<Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
							<Typography variant='body2' color='white'>
								{`Both ${targetAge.toString()}:`}
							</Typography>
						</Grid>
						<Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
							<Typography variant='body2' textAlign='right' color='white'>
								{displayPercent(
									us.getProbabilityOfBothReachingTargetAge(targetAge)
								)}
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						direction='row'
						bgcolor={COLORS2[1]}
						alignItems='flex-start'
					>
						<Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
							<Typography color='white' variant='body2'>
								{`At least one ${targetAge.toString()}:`}
							</Typography>
						</Grid>
						<Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
							<Typography variant='body2' color='white' textAlign='right'>
								{displayPercent(
									us.getProbabilityOfAtLeastOneReachingTargetAge(targetAge)
								)}
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						direction='row'
						bgcolor={COLORS[0]}
						alignItems='flex-start'
					>
						<Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
							<Typography variant='body2' color='white'>
								{`Neither ${targetAge.toString()}:`}
							</Typography>
						</Grid>

						<Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
							<Typography variant='body2' color='white' textAlign='right'>
								{displayPercent(
									us.getProbabilityOfNeitherReachingTargetAge(targetAge)
								)}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Typography variant='caption'>
					{'Results are Based on the '}
					<Link
						sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
						href='https://www.ssa.gov/oact/STATS/table4c6.html'
						target='_blank'
						rel='noopener'
					>
						Social Security Actuarial Life Table.
					</Link>
				</Typography>
			</Grid>
		</Grid>
	)
}

export default CoupleStats
