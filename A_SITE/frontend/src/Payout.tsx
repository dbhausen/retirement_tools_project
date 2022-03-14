import { Box, Grid, Typography } from '@mui/material'
import { AnnuityContext, IFormattedPayments } from 'AnnuityContext'
import { useContext } from 'react'
import { CoupleContext, displayCurrency } from 'CoupleContext'
import { UserContext } from 'UserContext'
import PayoutHelp from 'PayoutHelp'
import PayoutTable from 'PayoutTable'

const Payout = () => {
	const { annuityConfig } = useContext(AnnuityContext)
	const { couple } = useContext(CoupleContext)

	const userContext = useContext(UserContext)
	const user = userContext?.user

	let totalExpectedPayments = 0
	let discountedTotalPayments = 0
	const formattedPayments: IFormattedPayments[] = []

	if (annuityConfig.isCalculated) {
		for (
			let index = 0;
			index < couple.targetAge - couple.person1.age;
			index += 1
		) {
			if (annuityConfig.payments[index]) {
				const element = annuityConfig.payments[index]
				totalExpectedPayments += element.payment
				discountedTotalPayments += element.discountedAmt
			}
		}
	}

	annuityConfig.payments.forEach(payment =>
		formattedPayments.push({
			id: payment.id,
			year: payment.year,
			spouse1Age: payment.spouse1Age,
			spouse2Age: payment.spouse2Age,
			age: `${payment.spouse1Age.toFixed(0)}/${payment.spouse2Age.toFixed(
				0
			)}`,
			payment: displayCurrency(payment.payment),
			discountedAmt: displayCurrency(payment.discountedAmt),
			actuarialAmt: displayCurrency(payment.actuarialAmt),
			discounter: payment.discounter.toString(),
			valueOfGuarantee: displayCurrency(payment.valueOfGuarantee),
		})
	)

	return (
		<Grid id='page' container direction='row' sx={{ marginTop: '70px' }}>
			<Grid id='left-side' item xs={12} sm={12} md={6} lg={5} xl={4}>
				<Grid container direction='column'>
					<Grid>
						{annuityConfig.isCalculated ? (
							<Box
								sx={{
									height: 455,
									marginLeft: '-10px',
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
						<Grid
							sx={{
								display: {
									xl: 'block',
									lg: 'block',
									md: 'block',
									sm: 'block',
									xs: 'block',
								},
								width: '100%',
								paddingTop: '15px',
							}}
						>
							<Typography gutterBottom>
								The <strong>Total Value</strong> is sum of the{' '}
								<strong>Actuarial</strong> amounts:{' '}
								<strong>
									{displayCurrency(annuityConfig.totalAdjustedValue)}
								</strong>
								{'. '}
								The value is not based on how long you think you will
								live. It is based on the actuarial tables.
							</Typography>
							<Typography gutterBottom>
								If you (or your spouse) live to {couple.targetAge}, as
								you expect, you will have received payments totaling{' '}
								{displayCurrency(totalExpectedPayments)}. These future
								payments have a present value of{' '}
								{displayCurrency(discountedTotalPayments)}. Obviously,
								it is better to live longer if you are going to buy an
								annuity.
							</Typography>
						</Grid>
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
					{user?.name}
					{annuityConfig.isCalculated ? <PayoutHelp /> : null}
				</Box>
			</Grid>
		</Grid>
	)
}

export default Payout
