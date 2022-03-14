import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Grid, styled, Typography } from '@mui/material'
import { AnnuityContext } from 'AnnuityContext'
import { useContext } from 'react'
import { displayCurrency } from 'CoupleContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

interface Column {
	id: 'year' | 'payment' | 'discountedAmt' | 'actuarialAmt'
	label: any
	width?: number
	alignHeading?: 'right' | 'center' | 'left'
	alignData?: 'right' | 'center' | 'left'
	// eslint-disable-next-line no-unused-vars
	format?: (value: number) => string
}

const columns: readonly Column[] = [
	{
		id: 'year',
		label: (
			<Typography sx={{ writingMode: 'horizontal-tb', width: 20 }}>
				Year
			</Typography>
		),
		width: 20,
		alignHeading: 'left',
		alignData: 'left',
	},
	{
		id: 'payment',
		label: (
			<Typography sx={{ writingMode: 'horizontal-tb' }}>
				<Grid>
					<Grid>COLA</Grid>
					<Grid>Adjusted</Grid>
					<Grid>Payment</Grid>
				</Grid>
			</Typography>
		),
		width: 60,
		alignHeading: 'right',
		alignData: 'right',
		format: (value: number) => displayCurrency(value),
	},
	{
		id: 'discountedAmt',
		label: (
			<Typography sx={{ writingMode: 'horizontal-tb' }}>
				<Grid>
					<Grid>Discounted</Grid>
					<Grid>Value</Grid>
				</Grid>
			</Typography>
		),
		width: 40,
		alignHeading: 'right',
		alignData: 'right',
		format: (value: number) => displayCurrency(value),
	},
	{
		id: 'actuarialAmt',
		label: (
			<Typography sx={{ writingMode: 'horizontal-tb' }}>
				<Grid>
					<Grid>Actuarial</Grid>
					<Grid>Value</Grid>
				</Grid>
			</Typography>
		),
		width: 40,
		alignHeading: 'right',
		alignData: 'right',
		format: (value: number) => displayCurrency(value),
	},
]

interface Data {
	year: string
	payment: number
	discountedAmt: number
	actuarialAmt: number
}

function createData(
	year: string,
	payment: number,
	discountedAmt: number,
	actuarialAmt: number
): Data {
	return { year, payment, discountedAmt, actuarialAmt }
}

export default function StickyHeadTable() {
	const { annuityConfig } = useContext(AnnuityContext)
	const rows: Data[] = []
	annuityConfig.payments.forEach(payment =>
		rows.push(
			createData(
				payment.year.toFixed(0),
				payment.payment,
				payment.discountedAmt,
				payment.actuarialAmt
			)
		)
	)

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.alignHeading}
									style={{
										width: column.width,
										paddingLeft: 1,
										paddingRight: 1,
										paddingTop: 5,
										paddingBottom: 5,
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<StyledTableRow hover tabIndex={-1} key={row.year}>
								{columns.map(column => {
									const value = row[column.id]
									return (
										<StyledTableCell
											key={column.id}
											align={column.alignData}
											style={{
												width: column.width,
												paddingLeft: 1,
												paddingRight: 1,
												paddingTop: 7,
												paddingBottom: 7,
											}}
										>
											{column.format && typeof value === 'number'
												? column.format(value)
												: value}
										</StyledTableCell>
									)
								})}
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}
