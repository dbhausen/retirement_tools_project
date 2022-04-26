import Tab from '@mui/material/Tab'
import { styled, Tabs, Toolbar } from '@mui/material'
import { green } from '@mui/material/colors'

const StyledToolbar = styled(Toolbar)(() => ({
	alignItems: 'flex-start',

	// Override media queries injected by theme.mixins.toolbar
	'@media all': {
		minHeight: 20,
		maxHeight: 31,
	},
}))

const TitleWrapper = styled('div')(({ theme }) => ({
	top: 1,
	paddingLeft: 75,
	paddingBottom: 0,
	// width: 150,
	zIndex: 9,
	position: 'relative',
	color: theme.palette.getContrastText(theme.palette.background.paper),
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'left',
	justifyContent: 'left',
}))

interface StyledTabProps {
	label: any
	value: string
	to: string
	component: any
	disabled?: boolean
}

const AntTabs = styled(Tabs)(() => ({
	marginTop: 3,
	borderBottom: '1px solid primary',
	'& .MuiTabs-indicator': {
		//	backgroundColor: theme.palette.grey.A400,
	},
}))

const AntTab = styled((props: StyledTabProps) => (
	<Tab disableRipple={false} {...props} />
))(({ theme }) => ({
	textTransform: 'capitalize',
	minWidth: 0,

	// color: theme.palette.getContrastText(theme.palette.grey.A700),
	// backgroundColor: theme.palette.grey.A700,
	paddingLeft: 5,
	paddingRught: 5,
	paddingTop: 0,
	paddingBottom: 3,

	// fontSizeAdjust: 'from-font',
	'&.MuiTabs-indicator': {
		//	color: theme.palette.background.paper,
	},

	'&:hover': {
		color: green[800],
		backgroundColor: theme.palette.grey.A700,
		// opacity: 1,
	},
	'&.Mui-selected': {
		backgroundColor: theme.palette.grey.A700,
		color: theme.palette.getContrastText(theme.palette.grey.A700),
	},
	'&.Mui-focusVisible': {
		// backgroundColor: '#d1eaff',
	},
	'&.Mui-disabled': {
		color: theme.palette.grey.A400,
	},
}))

export { StyledToolbar, AntTab, AntTabs, TitleWrapper }
