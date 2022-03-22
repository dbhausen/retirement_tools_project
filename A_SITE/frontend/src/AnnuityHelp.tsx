import { Grid, Link, Paper, Typography } from '@mui/material'

const AnnuityHelp = () => (
	<Paper>
		<Grid container direction='column' sx={{ p: '15px' }}>
			<Grid>
				<Typography gutterBottom>
					You have few options with your Social Security other than your
					start date. For annuities purchased from an insurance company
					there are many options:
				</Typography>
			</Grid>
			<Grid>
				<Typography component='div' gutterBottom>
					<ul>
						<li>
							<strong> Annual Annuity Amount</strong>
						</li>
						<li>
							<strong>Cost-Of-Living Adjustment</strong>
						</li>
						<li>
							<strong>Guaranteed Return Of Purchase Price</strong>
						</li>
						<li>
							There are all sorts of other options offered by insurance
							companies. They all impact the purchase price but it can be
							difficult to determine cost or value of the individual
							parts.
						</li>
					</ul>
				</Typography>
			</Grid>
			<Grid>
				<Typography gutterBottom>
					What is the <strong>Risk-Free Rate Of Return</strong>? In
					economic terms this is your liquidity preference. Think of it as
					the opportunity cost of buying an annuity; once you buy an
					annuity you cannot use that same money to buy a car or take a
					vacation. In this tool you must decide what those other uses are
					worth. For most people, it makes sense to use a risk-free rate of
					return based on{' '}
					<Link
						sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
						href='https://www.cnbc.com/quotes/US30Y'
						target='_blank'
						rel='noopener'
					>
						U.S. 30 Year Treasury Rate
					</Link>{' '}
					because the return from a treasury is simularily safe. The higher
					the rate you choose the less valuable the annuity stream will be.
					When you buy an annuity from an insurance company the risk-free
					rate of return is built into the price.
				</Typography>
			</Grid>

			<Grid>
				<Typography gutterBottom>
					The <strong>Total Value</strong> of an annuity is based on your
					age and the annuity options you have selected. This is not the
					cost of an annuity offered by any insurance company. That cost
					will be determined by the insurance company. In addition to the
					value of the income stream you are purchasing you will also pay
					the sales commission, administrative cost, advertising, golf
					tournament sponsorships and dividends paid to the shareholders
					(in short, you will pay a lot).
				</Typography>
			</Grid>
		</Grid>
	</Paper>
)

export default AnnuityHelp
