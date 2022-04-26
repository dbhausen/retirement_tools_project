export default {
	MuiAccordionSummary: {
		styleOverrides: {
			root: {
				minHeight: 0,
				'& .MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded':
					{
						marginTop: 5,
						marginBottom: 5,
					},
			},
		},
	},
	MuiAccordionDetails: {
		styleOverrides: {
			root: {
				minHeight: 0,
				'& .MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded':
					{
						marginTop: 5,
						marginBottom: 5,
					},
			},
		},
	},
}
