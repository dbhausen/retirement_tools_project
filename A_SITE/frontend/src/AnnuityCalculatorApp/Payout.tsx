import { Box, Grid, Paper, Typography } from '@mui/material'
import { useContext } from 'react'
import { AnnuityContext } from './AnnuityContext'
import { CoupleContext, displayCurrency } from '../contexts/CoupleContext'
import PayoutHelp from './PayoutHelp'
import PayoutTable from './PayoutTable'
import { Couple } from './Couple'

const Payout = () => {
	const { annuityConfig } = useContext(AnnuityContext)
	const { couple } = useContext(CoupleContext)

	let totalExpectedPayments = 0
	let discountedTotalPayments = 0
	// const formattedPayments: IFormattedPayments[] = []

	const birthYearOfYoungest = Couple.getBirthYearOfYoungest(couple)

	annuityConfig.payments.forEach(payment => {
		if (payment.year <= birthYearOfYoungest + couple.targetAge) {
			totalExpectedPayments += payment.payment
			discountedTotalPayments += payment.discountedAmt
		}
	})

	return (
		<Grid id='page' container direction='row'>
			<Grid id='left-side' item xs={12} sm={12} md={6} lg={5} xl={4}>
				<Grid container direction='column'>
					<Grid>
						{annuityConfig.isCalculated ? (
							<Box
								sx={{
									height: 455,
									//	marginLeft: '-10px',
									maxWidth: '400px',
									minWidth: '350px',
								}}
							>
								<PayoutTable />
							</Box>
						) : (
							<Typography variant='caption'>
								No results have been calculated. Go back to annuity tab
								and calculate again
							</Typography>
						)}
					</Grid>
					{annuityConfig.isCalculated ? (
						<Paper
							sx={{
								display: {
									xl: 'block',
									lg: 'block',
									md: 'block',
									sm: 'block',
									xs: 'block',
								},
								//		width: '100%',
								padding: '15px',
							}}
						>
							<Typography gutterBottom>
								The <strong>Total Value</strong> of this annuity is{' '}
								<strong>
									{displayCurrency(annuityConfig.totalAdjustedValue)}
								</strong>
								. This is the sum of the{' '}
								<strong>Actuarial Values </strong>. This value is not
								based on how long you think you will live. It is based
								on the actuarial tables.
							</Typography>
							{couple.married ? (
								<Typography gutterBottom>
									If you (or your spouse) live to {couple.targetAge},
									as you expect, you will have received payments
									totaling {displayCurrency(totalExpectedPayments)}.
									These future payments have a present value of{' '}
									{displayCurrency(discountedTotalPayments)}.
									Obviously, it is better to live longer if you are
									going to buy an annuity.
								</Typography>
							) : (
								<Typography gutterBottom>
									If you live to {couple.targetAge}, as you expect, you
									will have received payments totaling{' '}
									{displayCurrency(totalExpectedPayments)}. These
									future payments have a present value of{' '}
									{displayCurrency(discountedTotalPayments)}.
									Obviously, it is better to live longer if you are
									going to buy an annuity.
								</Typography>
							)}
						</Paper>
					) : null}
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
							xs: 'block',
						},
						width: '100%',
					}}
				>
					{annuityConfig.isCalculated ? <PayoutHelp /> : null}
				</Box>
			</Grid>
		</Grid>
	)
}

export default Payout
