import React, { createContext } from 'react'

interface IAnnuityConfig {
	annuityAmount: string
	discountRate: string
	costOfLivingAdjustment: string
	guatantee: [boolean, boolean]
	isCalculated: boolean
	valueOfGuarantee: number
	totalPaymentsReceived: number
	totalAjustedValue: number
	payments: {
		id: number
		year: number
		spouse1Age: number
		spouse2Age: number
		payment: number
		discountedAmt: number
		actuarialAmt: number
		discounter: number
		valueOfGuarantee: number
	}[]
}

interface IFormattedPayments {
	id: number
	year: number
	spouse1Age: number
	spouse2Age: number
	payment: string
	discountedAmt: string
	actuarialAmt: string
	discounter: string
	valueOfGuarantee: string
}

const defaultAnnuityConfig: IAnnuityConfig = {
	annuityAmount: '10000',
	discountRate: '1.79',
	costOfLivingAdjustment: '2',
	guatantee: [false, false],
	isCalculated: false,
	valueOfGuarantee: 0,
	totalPaymentsReceived: 0,
	totalAjustedValue: 0,
	payments: [
		{
			id: 0,
			year: 0,
			spouse1Age: 0,
			spouse2Age: 0,
			payment: 0,
			discountedAmt: 0,
			actuarialAmt: 0,
			discounter: 0,
			valueOfGuarantee: 0,
		},
	],
}

interface IAnnuityContext {
	annuityConfig: IAnnuityConfig
	setAnnuityConfig: React.Dispatch<React.SetStateAction<IAnnuityConfig>>
}

const AnnuityContext = createContext<IAnnuityContext>({
	annuityConfig: defaultAnnuityConfig,
	setAnnuityConfig: () => {},
})

export { AnnuityContext, defaultAnnuityConfig }
export type { IAnnuityConfig, IFormattedPayments }
