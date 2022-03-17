import { Grid, Link, Typography } from '@mui/material'
import React from 'react'

const ActuaryHelp = () => (
	<Grid container direction='column' sx={{ p: '15px' }}>
		<Grid>
			<Typography gutterBottom>
				Use this tool to help you think about and visualize the annuity
				income in your retirement portfolio. Annuity income (including your
				Social Security benefit) has, in my view, the following
				characteristics:
			</Typography>
		</Grid>
		<Grid>
			<Typography component='div' gutterBottom>
				<ul>
					<li>Consistent predictable payments</li>
					<li>
						Low risk (you are certain it will be fully paid when due)
					</li>
					<li>Lasts for your lifetime</li>
					<li>Generally, does not benefit your heirs</li>
				</ul>
			</Typography>
		</Grid>
		<Grid>
			<Typography component='div' gutterBottom>
				The primary factor determining the value of an annuity income stream
				is your age and sex (and, if married, that of your spouse). The
				longer you are likely to receive the income the more it is worth.
				The age and sex of you and your spouse is converted by this tool
				into the probabilities of being alive at any given age. The
				probabilities are expressed as percentages and the calculations are
				based on the
				<Link
					sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
					href='https://www.ssa.gov/oact/STATS/table4c6.html'
					target='_blank'
					rel='noopener'
				>
					Social Security Actuarial Life Table.
				</Link>{' '}
				(actuarial tables).
			</Typography>
		</Grid>
		<Grid>
			<Typography component='div' gutterBottom>
				The Social Security Actuarial Life Table I used does not take into
				account other risk factors such as:
				<ul>
					<li>Health</li>
					<li>Smoking Habits</li>
					<li>Genetics</li>
					<li>Gender Identity</li>
				</ul>
			</Typography>
		</Grid>
	</Grid>
)

export default ActuaryHelp
