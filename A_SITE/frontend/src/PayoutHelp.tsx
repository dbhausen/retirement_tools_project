import { Grid, Typography } from '@mui/material'
import { AnnuityContext } from 'AnnuityContext'
import {
	CoupleContext,
	displayCurrency,
	displayFixed,
	displayPercent3,
} from 'CoupleContext'
import { useContext } from 'react'

const PayoutHelp = () => {
	const { couple } = useContext(CoupleContext)
	const { annuityConfig } = useContext(AnnuityContext)

	let actuarialAmt = ''
	let payment = ''
	let year = ''
	let spouse1Age = ''
	let spouse2Age = ''
	let either = ''
	let discountedAmt = ''

	if (annuityConfig.isCalculated) {
		const rowNumber = Number((annuityConfig.payments.length / 2).toFixed(0))

		actuarialAmt = displayCurrency(
			annuityConfig.payments[rowNumber].actuarialAmt
		)
		payment = displayCurrency(annuityConfig.payments[rowNumber].payment)
		discountedAmt = displayCurrency(
			annuityConfig.payments[rowNumber].discountedAmt
		)
		year = annuityConfig.payments[rowNumber].year.toFixed(0)
		spouse1Age = displayFixed(annuityConfig.payments[rowNumber].spouse1Age)
		spouse2Age = displayFixed(annuityConfig.payments[rowNumber].spouse2Age)
		either = displayPercent3(
			couple.getProbabilityOfAtLeastOneReachingTargetAge(
				annuityConfig.payments[rowNumber].spouse1Age
			)
		)
	}

	return (
		<Grid container direction='column' sx={{ p: '15px' }}>
			<Grid>
				<Typography gutterBottom>
					This table is a breakout of the value of the payments received by
					year
				</Typography>
			</Grid>
			<Grid>
				<Typography component='div' gutterBottom>
					<ul>
						<li>
							<strong>Ages:</strong> Ages of the two spouses
						</li>
						<li>
							<strong>Payment:</strong> The nominal amount paid in this
							year including the Cost-Of-Living Adjustment
						</li>
						<li>
							<strong>Discount:</strong> The payment discounted for the
							time value of money based the Risk-Free Rate Of Return
						</li>
						<li>
							<strong>Actuarial:</strong> Represents the value of the
							annuity payment that may or may not be received at a future
							date.
						</li>
					</ul>
				</Typography>
			</Grid>
			<Grid>
				<Typography component='div' gutterBottom>
					For example, scroll down to the row for ages {spouse1Age}/
					{spouse2Age}
					<ul>
						<li>
							<strong>Ages:</strong>{' '}
							<strong>
								{' '}
								{spouse1Age}/{spouse2Age}
							</strong>{' '}
							The ages of the spouses, if alive in {year}, will be{' '}
							{spouse1Age} and {spouse2Age}.
						</li>
						<li>
							<strong>Payment:</strong> <strong>{payment}</strong> is
							your original annuity amount of{' '}
							{displayCurrency(Number(annuityConfig.annuityAmount))} with
							a {annuityConfig.costOfLivingAdjustment}
							{'% '} annual Cost-Of-Living Adjustment.
						</li>
						<li>
							<strong>Discount:</strong> <strong>{discountedAmt}</strong>{' '}
							is the value today of {payment} that will be received in{' '}
							{year} based on Risk-Free Rate Of Return of{' '}
							{annuityConfig.discountRate}%
						</li>
						<li>
							<strong>Actuarial:</strong> <strong>{actuarialAmt}</strong>{' '}
							is the {discountedAmt} discounted payment multiplied by{' '}
							{either} (the odds that at least one of you will be alive
							to collect the payment in {year} based on the Social
							Security Life Table)
						</li>
					</ul>
				</Typography>
			</Grid>
		</Grid>
	)
}

export default PayoutHelp