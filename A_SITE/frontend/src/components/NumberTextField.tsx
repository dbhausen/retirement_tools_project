import * as React from 'react'

import { NumericFormat } from 'react-number-format'
import TextField, { TextFieldProps } from '@mui/material/TextField'

interface CustomProps {
	// eslint-disable-next-line no-unused-vars
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
}

const NumberFormatCustom = React.forwardRef<typeof NumericFormat, CustomProps>(
	(props, ref) => {
		const { onChange, ...other } = props

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={values => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					})
				}}
				valueIsNumericString={true}
			/>
		)
	}
)

interface IExtra {
	thousandSeparator?: boolean | undefined
	fixedDecimalScale?: boolean | undefined
	decimalScale?: number
	// eslint-disable-next-line no-unused-vars
	isAllowed?: (value: any) => {}
	allowNegative?: boolean | undefined
}

const NumberTextField = (props: IExtra & TextFieldProps) => {
	const {
		prefix,
		thousandSeparator,
		fixedDecimalScale,
		decimalScale,
		isAllowed,
		allowNegative,
		...other
	} = props
	//	const ts = thousandSeparator === undefined ? false : thousandSeparator

	return (
		<TextField
			{...other}
			InputProps={{
				inputComponent: NumberFormatCustom as any,
				inputProps: {
					prefix,
					isAllowed,
					thousandSeparator,
					fixedDecimalScale,
					decimalScale,
					allowNegative,
				},
			}}
		/>
	)
}

const PercentTextField = (props: IExtra & TextFieldProps) => {
	const {
		thousandSeparator,
		fixedDecimalScale,
		decimalScale,
		allowNegative,
		...other
	} = props
	const suffix = '%'
	// const fds = fixedDecimalScale === undefined ? true : fixedDecimalScale
	// const ds = decimalScale === undefined ? 2 : decimalScale
	return (
		<TextField
			{...other}
			InputProps={{
				inputComponent: NumberFormatCustom as any,
				inputProps: {
					thousandSeparator,
					fixedDecimalScale,
					decimalScale,
					suffix,
					allowNegative,
				},
			}}
		/>
	)
}

export { NumberTextField, PercentTextField }
