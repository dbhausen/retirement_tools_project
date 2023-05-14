/* eslint-disable arrow-body-style */
import * as React from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AppBar,
	Box,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, ChangeEvent, useContext } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ThemeModeContext } from '../contexts/ThemeModeContext'
import { NumberTextField } from '../components/NumberTextField'
import { StressTestContext } from './StressTestContext'

const Assets = () => {
	const [expandedList, setExpandedList] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	])
	const [type, setType] = useState('Income')
	const [allExpand, setAllExpand] = useState(false)
	const { drawerWidth, theme } = useContext(ThemeModeContext)
	const { stressTestConfig, setStressTestConfig, setStoredStressTestConfig } =
		useContext(StressTestContext)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setType((event.target as HTMLInputElement).value)
	}
	const handleOpenAllClick = () => {
		setExpandedList([true, true, true, true, true, true, true, true])
		setAllExpand(true)
	}
	const handleCloseAllClick = () => {
		setExpandedList([false, false, false, false, false, false, false, false])
		setAllExpand(false)
	}

	const handleStressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStressTestConfig({
			...stressTestConfig,
			[event.target.name]: event.target.value,
		})
		setStoredStressTestConfig({
			...stressTestConfig,
			[event.target.name]: event.target.value,
		})
	}

	const handleClick = (index: number) => {
		const newExpandedList = expandedList.slice()
		newExpandedList[index] = !expandedList[index]

		setExpandedList(newExpandedList)
	}

	return (
		<Box
			sx={{
				marginTop: '30px',
			}}
		>
			<AppBar
				sx={{
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.getContrastText(
						theme.palette.background.paper
					),
					maxHeight: '30px',
					marginTop: '73px',
				}}
			>
				<Grid container>
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
					/>
					<FormControl sx={{ marginLeft: '10px', marginTop: '-10px' }}>
						<RadioGroup
							row
							aria-labelledby='demo-controlled-radio-buttons-group'
							name='controlled-radio-buttons-group'
							value={type}
							onChange={handleChange}
							sx={{ padding: '3px' }}
						>
							<FormControlLabel
								value='Income'
								control={<Radio />}
								label='Income'
							/>
							<FormControlLabel
								value='Assets'
								control={<Radio />}
								label='Assets'
							/>
						</RadioGroup>
					</FormControl>
				</Grid>

				<Box sx={{ position: 'absolute', top: -4, right: 8 }}>
					{!allExpand ? (
						<IconButton onClick={handleOpenAllClick}>
							<ArrowDropDownIcon />
						</IconButton>
					) : (
						<IconButton onClick={handleCloseAllClick}>
							<ArrowDropUpIcon />
						</IconButton>
					)}
				</Box>
			</AppBar>
			<Accordion hidden={type === 'Assets'} expanded={expandedList[0]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					onClick={() => handleClick(0)}
				>
					<Typography>Earned Income</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						How much. When do you expect it to end. fixe
					</Typography>
					<NumberTextField
						label='Spouse 1'
						name='earnedIncomeSpouse1'
						prefix='$'
						thousandSeparator
						decimalScale={0}
						fixedDecimalScale={true}
						value={stressTestConfig.earnedIncomeSpouse1}
						onChange={handleStressChange}
						variant='standard'
						allowNegative={false}
					/>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Assets'} expanded={expandedList[1]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					onClick={() => handleClick(1)}
				>
					<Typography>Social Security</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>You, spouse amount and when to start</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Assets'} expanded={expandedList[2]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					onClick={() => handleClick(2)}
				>
					<Typography>Other Fixed income</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>You, spouse amount and when to start</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Income'} expanded={expandedList[3]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					onClick={() => handleClick(3)}
				>
					<Typography>Tax Deferred Portfolio</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Amount and asset allocation</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Income'} expanded={expandedList[4]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel2a-content'
					id='panel2a-header'
					onClick={() => handleClick(4)}
				>
					<Typography>Taxable Portfolio</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Amount and asset allocation</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Income'} expanded={expandedList[5]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel3a-content'
					id='panel3a-header'
					onClick={() => handleClick(5)}
				>
					<Typography>Income Property</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Enter the total value of assets that do generate income and
						are expected to appreciate.
					</Typography>
					<Typography>
						Value, Amount Financed, Years to payoff and net income (net of
						interest, taxes and expenses )
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Income'} expanded={expandedList[6]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel3a-content'
					id='panel3a-header'
					onClick={() => handleClick(6)}
				>
					<Typography>Other Appreciating Assets</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Enter the total value of assets that do not generate income
						but are expected to appreciate. This might include precious
						metals or collectables
					</Typography>
					<Typography>
						Value, Amount Financed , and net income (net of interest,
						taxes and expenses )
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion hidden={type === 'Income'} expanded={expandedList[7]}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel3a-content'
					id='panel3a-header'
					onClick={() => handleClick(7)}
				>
					<Typography>Home</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Your home may be a significant asset but it is assumed to not
						generate income in the short term. In the long term it may be
						liquidated to meet expenses such as long term care. Or it may
						be passed to heirs. In this tool it will be part of your net
						worth but has no impact on income.
					</Typography>
					<Typography>Value, Amount Financed, years financed</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

export default Assets
