import { useContext } from 'react'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
	Grid,
	styled,
	TableFooter,
	Typography,
	TableRow,
	TableHead,
	TableContainer,
	TableBody,
	Table,
	Paper,
} from '@mui/material'
import { displayCurrency } from '../contexts/CoupleContext'
import { AnnuityContext } from './AnnuityContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.getContrastText(theme.palette.background.default),
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&.green:nth-of-type(odd)': {
		backgroundColor: theme.palette.success.dark,
	},
	'&.green:nth-of-type(even)': {
		backgroundColor: theme.palette.success.main,
	},
	'&.green:hover': {
		backgroundColor: theme.palette.success.light,
	},

	'&.normal:nth-of-type(odd)': {
		backgroundColor: theme.palette.error.light,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
	},
	'&.normal:nth-of-type(even)': {
		backgroundColor: theme.palette.error.main,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
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
			<Typography component='div' sx={{ writingMode: 'horizontal-tb' }}>
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
			<Typography component='div' sx={{ writingMode: 'horizontal-tb' }}>
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
			<Typography component='div' sx={{ writingMode: 'horizontal-tb' }}>
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
	style: string
}

function createData(
	year: string,
	payment: number,
	discountedAmt: number,
	actuarialAmt: number,
	style: string
): Data {
	return { year, payment, discountedAmt, actuarialAmt, style }
}

export default function StickyHeadTable() {
	const { annuityConfig } = useContext(AnnuityContext)
	const rows: Data[] = []
	let totalPayments = 0
	let breakevenYear = ''
	let style = 'normal'
	annuityConfig.payments.forEach(payment => {
		totalPayments += payment.discountedAmt

		if (totalPayments >= annuityConfig.totalAdjustedValue) {
			style = 'green'
			if (breakevenYear === '')
				breakevenYear = `${payment.year.toFixed(
					0
				)}, age: ${payment.spouse1Age.toFixed(0)}`
		}
		rows.push(
			createData(
				payment.year.toFixed(0),
				payment.payment,
				payment.discountedAmt,
				payment.actuarialAmt,
				style
			)
		)
	})

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer
				sx={{
					width: 300,
					borderLeft: '10px solid',
					borderRight: '10px solid',
					borderBottom: '10px solid',
					//	margin: '10px',
					borderColor: 'background.default',
					maxHeight: 440,
				}}
			>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<StyledTableCell
									key={column.id}
									align={column.alignHeading}
									style={{
										width: column.width,
										paddingLeft: 1,
										paddingRight: 1,
										paddingTop: 5,
										paddingBottom: 2,
									}}
								>
									{column.label}
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<StyledTableRow
								hover
								className={row.style}
								tabIndex={-1}
								key={row.year}
							>
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
				<TableFooter>
					{' '}
					<TableRow>Breakeven: {breakevenYear}</TableRow>
				</TableFooter>
			</TableContainer>
		</Paper>
	)
}
