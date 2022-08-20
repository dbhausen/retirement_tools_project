import { Grid, Link, Paper, Typography } from '@mui/material'
import React from 'react'

const ActuaryHelp = () => (
	<Paper>
		<Grid container direction='column'>
			<Grid>
				<Typography gutterBottom>
					Use this tool to help you think about and visualize the annuity
					income in your retirement portfolio. Annuity income (including
					your Social Security benefit) has, in my view, the following
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
					The primary factor determining the value of an annuity income
					stream is your age and sex (and, if married, that of your
					spouse). The longer you are likely to receive the income the more
					it is worth. The age and sex of you and your spouse is converted
					by this tool into the probabilities of being alive at any given
					age. The probabilities are expressed as percentages and the
					calculations are based on the
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
					Differences in education, employment opportunities, lifestyle
					behaviors, social mobility and the wider local environment all
					have a major impact on male and female longevity. In addition
					however, research shows that lifestyle plays almost no factor in
					health and longevity after the age of 80, and that almost
					everything in advanced age is due to genetic factors. I think the
					implication is that poor choices tend to result in death proir to
					80.
				</Typography>
			</Grid>
			<Grid>
				<Typography component='div' gutterBottom>
					For purposes of valuing an annuity, if are likely to outlive your
					average age cohort then this tool understates the value to you of
					an annuity you would purchase. On the other hand, if you face
					above average risk of early death then an annuity is worth less.
				</Typography>
			</Grid>
			<Grid>
				<Typography component='div' gutterBottom>
					One last point: Insurance Companies are evil but they are not
					dumb. Insurance companies know all this and price their products
					to make a profit based on the characteristics of the
					self-selecting subset of the population that purchase annuities.
					So you do not simply need to outlive the average person, you need
					to outlive the average person who is willing to bet that they
					will outlive the average person. Good luck!
				</Typography>
			</Grid>

			<Typography
				component='div'
				gutterBottom
				sx={{ margin: 0, padding: 0 }}
			>
				The Social Security Actuarial Life Table I used only take sex into
				account. Other risk factors such as:
				<ul>
					<li>Health</li>
					<li>Smoking Habits</li>
					<li>Genetics</li>
					<li>Gender Identity</li>
				</ul>
				are not brooken out.
			</Typography>
		</Grid>
	</Paper>
)

export default ActuaryHelp
