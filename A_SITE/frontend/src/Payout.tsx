/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import { AnnuityContext, IFormattedPayments } from 'AnnuityContext'
import React, { useContext } from 'react'
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
} from '@mui/x-data-grid'
import { Payment } from '@mui/icons-material'

// const displayFixed = (n: number) => `$${n.toFixed(2)}`
const displayFixed = (n: number) =>
	`$${n.toLocaleString('en-us', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`

const Payout = () => {
	const { annuityConfig } = useContext(AnnuityContext)

	const formattedPayments: IFormattedPayments[] = []

	annuityConfig.payments.forEach(payment =>
		formattedPayments.push({
			id: payment.id,
			year: payment.year,
			spouse1Age: payment.spouse1Age,
			spouse2Age: payment.spouse2Age,
			payment: displayFixed(payment.payment),
			discountedAmt: displayFixed(payment.discountedAmt),
			actuarialAmt: displayFixed(payment.actuarialAmt),
			discounter: payment.discounter.toString(),
			valueOfGuarantee: displayFixed(payment.valueOfGuarantee),
		})
	)

	const rows: GridRowsProp = formattedPayments

	const columns: GridColDef[] = [
		{ field: 'year', headerName: 'Year', width: 55 },
		{ field: 'spouse1Age', headerName: 'Age', width: 55 },
		{ field: 'payment', headerName: 'Payment', width: 150 },
		{ field: 'discountedAmt', headerName: 'Discounted', width: 150 },
		{ field: 'actuarialAmt', headerName: 'Actuarial', width: 150 },
	]

	return (
		<Box sx={{ marginTop: '70px', height: 600, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				localeText={{
					toolbarDensity: 'Size',
					toolbarDensityLabel: 'Size',
					toolbarDensityCompact: 'Small',
					toolbarDensityStandard: 'Medium',
					toolbarDensityComfortable: 'Large',
				}}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</Box>
	)
}

export default Payout
