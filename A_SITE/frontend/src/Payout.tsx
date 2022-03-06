/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import { AnnuityContext, IFormattedPayments } from 'AnnuityContext'
import React, { useContext } from 'react'
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid'
import { Payment } from '@mui/icons-material'

// const displayFixed = (n: number) => `$${n.toFixed(2)}`
const displayFixed = (n: number) =>
	`$${n.toLocaleString('en-us', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	)
}

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
		{
			field: 'spouse1Age',
			headerName: 'Age',
			width: 55,
			align: 'center',
			sortable: false,
		},
		{
			field: 'payment',
			headerName: 'Payment',
			width: 90,
			align: 'right',
			sortable: false,
		},
		{
			field: 'discountedAmt',
			headerName: 'Discount',
			width: 90,
			align: 'right',
			sortable: false,
		},
		{
			field: 'actuarialAmt',
			headerName: 'Actuarial',
			width: 90,
			align: 'right',
			sortable: false,
		},
	]

	return (
		<Box sx={{ marginTop: '70px', height: 455, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				components={{
					Toolbar: CustomToolbar,
				}}
				density='compact'
				headerHeight={40}
				hideFooter={true}
				disableSelectionOnClick={true}
				disableColumnMenu={true}
			/>
		</Box>
	)
}

export default Payout
