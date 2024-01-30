/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'
import {
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowsProp,
	useGridApiRef,
} from '@mui/x-data-grid'
import { ThemeModeContext } from '../contexts/ThemeModeContext'
import { StyledToolbar, TitleWrapper } from '../components/AntTab'
import AppMenu from '../AppMenu'
import SizeId from '../components/SizeId'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import Form4 from './Form4'
import FormSummary from './FormSummary'
import { TStore, formDefaults, readModelData } from './FormTypes'
import axiosHttp from '../components/axiosHttp'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
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
			{value === index && <Box p={5}>{children}</Box>}
		</div>
	)
}

const MultiPartFormTabs = () => {
	const [store, setStore] = useState<TStore>(formDefaults)
	const [value, setValue] = useState(0)
	const { drawerWidth } = useContext(ThemeModeContext)

	type TValidPages = {
		page1: boolean
		page2: boolean
		page3: boolean
		page4: boolean
	}

	const initialPagesAreValid: TValidPages = {
		page1: false,
		page2: false,
		page3: false,
		page4: false,
	}

	const [arePagesValid, setArePagesValid] =
		useState<TValidPages>(initialPagesAreValid)

	const [columns, setColumns] = useState<GridColDef[]>([])

	// eslint-disable-next-line no-unused-vars, arrow-body-style

	useEffect(() => {
		axiosHttp
			.get(`/polls/opt/?model=Junk`)
			.then(response => {
				setColumns(response.data.gridColDef)
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}, [])

	const updateValidPages = (pageValid: Partial<TValidPages>) => {
		setArePagesValid({
			...arePagesValid,
			...pageValid,
		})
	}

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}
	const [rows, setRows] = useState<GridRowsProp>([])
	type TPageInfo = {
		count: number
		page: number
		pageSize: number
	}
	const [pageInfo, setPageInfo] = useState<TPageInfo>({
		count: -1,
		page: 0,
		pageSize: 10,
	})
	const [selectedId, setSelectedId] = useState(0)
	const apiRef = useGridApiRef()

	const handleEvent: GridEventListener<'rowClick'> = params => {
		// eslint-disable-next-line no-console
		console.log(`Movie "${params.row.id}" clicked`)
		setSelectedId(params.row.id)
		axiosHttp
			.get(`/polls/updatejunk/${params.row.id}`)
			.then(response => {
				setStore(readModelData(response.data))
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}

	const handleSubmit = (data: Partial<TStore>) => {
		if (data.page1) updateValidPages({ page1: true })
		if (data.page2) updateValidPages({ page2: true })
		if (data.page3) updateValidPages({ page3: true })
		if (data.page4) updateValidPages({ page4: true })
		setStore({
			...store,
			...data,
		})
	}

	const handleSubmitSave = (data: TStore) => {
		const posts: { text: string }[] = []
		data.page4.posts.map(entry => posts.push({ text: entry.text }))

		axiosHttp
			.post('/polls/junk/', {
				user_name: data.page1.username,
				password: data.page1.password,
				age: data.page2.age,
				color: data.page3.color,
				name: data.page4.name,
				posts,
			})
			.then(() => {
				setStore({
					...store,
					...data,
				})
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}

	useEffect(() => {
		axiosHttp
			.get(`/polls/listjunk/?page=${pageInfo.page + 1}`)
			.then(response => {
				setRows(response?.data?.results)
				if (pageInfo.count === -1)
					setPageInfo({
						...pageInfo,
						count: response?.data?.count,
					})
			})
			.catch((error: any) => {
				// eslint-disable-next-line no-console
				console.log(error)
			})
	}, [pageInfo])

	const handlePaginationChange = (newPage: {
		page: number
		pageSize: number
	}) => {
		setPageInfo({
			...pageInfo,
			pageSize: newPage.pageSize,
			page: newPage.page,
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
				aria-label='Multi-part form tabs'
			>
				<Tab
					icon={
						arePagesValid.page1 ? (
							<MdOutlineCheckBox />
						) : (
							<MdOutlineCheckBoxOutlineBlank />
						)
					}
					iconPosition='end'
					label='Page 1'
				/>
				<Tab
					icon={
						arePagesValid.page2 ? (
							<MdOutlineCheckBox />
						) : (
							<MdOutlineCheckBoxOutlineBlank />
						)
					}
					iconPosition='end'
					label='Page 2'
				/>
				<Tab
					icon={
						arePagesValid.page3 ? (
							<MdOutlineCheckBox />
						) : (
							<MdOutlineCheckBoxOutlineBlank />
						)
					}
					iconPosition='end'
					label='Page 3'
				/>
				<Tab
					icon={
						arePagesValid.page4 ? (
							<MdOutlineCheckBox />
						) : (
							<MdOutlineCheckBoxOutlineBlank />
						)
					}
					iconPosition='end'
					label='Page 4'
				/>

				<Tab label='Summary' />
			</Tabs>

			<TabPanel value={value} index={0}>
				<Form1 onSubmit={handleSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Form2 onSubmit={handleSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Form3 onSubmit={handleSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Form4 onSubmit={handleSubmit} store={store} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<FormSummary
					onSubmit={handleSubmitSave}
					selectedId={selectedId}
					store={store}
				/>
			</TabPanel>
			<div style={{ height: 300, width: '100%' }}>
				<DataGrid
					onRowClick={handleEvent}
					apiRef={apiRef}
					rows={rows}
					columns={columns}
					rowCount={pageInfo.count}
					pageSizeOptions={[pageInfo.pageSize]}
					paginationModel={pageInfo}
					paginationMode='server'
					onPaginationModelChange={handlePaginationChange}
				/>
			</div>

			<p>{selectedId}</p>
			<p>{pageInfo.count}</p>
		</div>
	)
}

export default MultiPartFormTabs
