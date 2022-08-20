import { Grid, Link, Paper, Typography } from '@mui/material'

const AnnuityHelp = () => (
	<Paper>
		<Grid container direction='column' sx={{ p: '15px' }}>
			<Grid>
				<Typography gutterBottom>
					note: What is the <strong>Risk-Free Rate Of Return</strong>? You
					will not see this on any insurance company sponsered web site
					because it is built into the price of their product. For most
					people, it makes sense to use a risk-free rate of return based on{' '}
					<Link
						sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
						href='https://www.cnbc.com/quotes/US30Y'
						target='_blank'
						rel='noopener'
					>
						U.S. 30 Year Treasury Rate
					</Link>{' '}
					because the return from a treasury is simularily safe.
				</Typography>
				<Typography gutterBottom>
					Think of it as the opportunity cost of buying an annuity; once
					you buy an annuity you cannot use that same money to buy a car,
					take a vacation or invest in the stock market. In this tool you
					must decide what those other uses are worth.
				</Typography>
				<Typography gutterBottom>
					The lower the rate you choose the more valuable a fixed annuity
					stream will be. If you put zero in for this rate you are saying
					the value of a $20 bill in your pocket today is exactly as
					valuable as one that will not be in your pocket until next week
					or twenty years from now.
				</Typography>
				<Typography gutterBottom>
					On the other hand, if you use a rate based on historical stock
					market returns, you are saying you are just as happy with
					actually having a $20 bill in your pocket as you are with a
					pretty good chance of having a $20 bill in your pocket. There is
					some art to this. You can use this tool to do &quot;what-if&quot;
					analysis.
				</Typography>
			</Grid>
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
							<strong>Deferral of start of payout</strong>
						</li>
						<li>
							There are all sorts of other options offered by insurance
							companies. They all impact the purchase price, but it can
							be difficult to determine cost or value of the individual
							parts.
						</li>
					</ul>
				</Typography>
			</Grid>

			<Grid>
				<Typography gutterBottom>
					The <strong>Total Value</strong> of an annuity, as calculated by
					this tool, is based on your age and the annuity options you
					select. This is not the cost of an annuity offered by any
					insurance company. That cost will be determined by the insurance
					company. Most of that cost will be for the value of the income
					stream you will receive however, you will also pay: the sales
					commission, administrative cost, advertising, golf tournament
					sponsorships and dividends paid to the shareholders (in short,
					you will pay a lot).
				</Typography>
			</Grid>
		</Grid>
	</Paper>
)

export default AnnuityHelp
