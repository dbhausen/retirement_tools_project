import { Box } from '@mui/material'

export interface messageListProps {
	messages: string[]
}

const ErrorMessageList = (props: messageListProps) => {
	const { messages } = props
	return (
		<Box sx={{ marginTop: '7px', width: '20em', backgroundColor: 'white' }}>
			<ol style={{ color: 'red', fontSize: '.9em' }}>
				{messages.map((message, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<li key={index.toString()}>
						<span>{message}</span>
					</li>
				))}
			</ol>
		</Box>
	)
}

export default ErrorMessageList
