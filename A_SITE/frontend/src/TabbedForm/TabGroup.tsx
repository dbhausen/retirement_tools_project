/* eslint-disable react/jsx-handler-names */
import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import AppMenu from '../AppMenu'
import { StyledToolbar, TitleWrapper } from '../components/AntTab'
import SizeId from '../components/SizeId'
import { ThemeModeContext } from '../contexts/ThemeModeContext'
import { TStore, formDefaults } from './FormTypes'
import FormSummary from './FormSummary'

interface TabPanelProps {
	children?: React.ReactNode
	index: any
	value: any
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	)
}

const SimpleTabs = () => {
	const [store, setStore] = React.useState(formDefaults)
	const [value, setValue] = React.useState(0)
	const { drawerWidth } = useContext(ThemeModeContext)

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	const onSubmit = (data: Partial<TStore>) => {
		// eslint-disable-next-line no-console
		console.log(data)

		setStore({
			...store,
			...data,
		})
	}

	return (
		<div>
			<Box sx={{ paddingTop: '75px', paddingLeft: '100px' }}>
				<AppBar
					enableColorOnDark={false}
					sx={{
						height: 71,
					}}
				>
					<TitleWrapper>
						<Box
							sx={{
								display: {
									xs: 'none',
									sm: 'none',
									md: 'block',
									width: drawerWidth - 21,

									boxSizing: 'border-box',
								},
							}}
						/>
						<Typography variant='h5'>Tabbed Form</Typography>
					</TitleWrapper>
					<StyledToolbar>
						<Box
							sx={{
								display: {
									xs: 'none',
									sm: 'none',
									md: 'block',
									width: drawerWidth - 21,
									height: 71,

									boxSizing: 'border-box',
								},
							}}
						/>
					</StyledToolbar>
					<SizeId />
					<AppMenu />
				</AppBar>
			</Box>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label='simple tabs example'
			>
				<Tab label='Page 1' />
				<Tab label='Page 2' />
				<Tab label='Page 3' />
				<Tab label='Summary' />
			</Tabs>

			<TabPanel value={value} index={0}>
				<Form1 onSubmit={onSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Form2 onSubmit={onSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Form3 onSubmit={onSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<FormSummary onSubmit={onSubmit} store={store} />
			</TabPanel>
		</div>
	)
}

export default SimpleTabs
