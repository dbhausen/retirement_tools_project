import React, { createContext, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

interface IAnnuityConfig {
	annuityAmount: string
	discountRate: string
	costOfLivingAdjustment: string
	guatantee: [boolean, boolean]
	isCalculated: boolean
	valueOfGuarantee: number
	totalPaymentsReceived: number
	totalAdjustedValue: number
	deferral: number
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

const defaultAnnuityConfig: IAnnuityConfig = {
	annuityAmount: '10000',
	discountRate: '1.79',
	costOfLivingAdjustment: '2',
	guatantee: [false, false],
	isCalculated: false,
	valueOfGuarantee: 0,
	totalPaymentsReceived: 0,
	totalAdjustedValue: 0,
	deferral: 0,
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
	storedAnnuityConfig: IAnnuityConfig
	setStoredAnnuityConfig: React.Dispatch<React.SetStateAction<IAnnuityConfig>>
}

const AnnuityContext = createContext<IAnnuityContext>({
	annuityConfig: defaultAnnuityConfig,
	setAnnuityConfig: () => {},
	storedAnnuityConfig: defaultAnnuityConfig,
	setStoredAnnuityConfig: () => {},
})

const AnnuityContextProvider = ({ children }: any) => {
	const [annuityConfig, setAnnuityConfig] =
		useState<IAnnuityConfig>(defaultAnnuityConfig)

	const [storedAnnuityConfig, setStoredAnnuityConfig] =
		useLocalStorage<IAnnuityConfig>('annuity-config', defaultAnnuityConfig)

	if (useIsFirstRender()) {
		setAnnuityConfig(storedAnnuityConfig)
	}

	const contextValue = useMemo(
		() => ({
			annuityConfig,
			setAnnuityConfig,
			storedAnnuityConfig,
			setStoredAnnuityConfig,
		}),
		[
			annuityConfig,
			setAnnuityConfig,
			storedAnnuityConfig,
			setStoredAnnuityConfig,
		]
	)
	return (
		// the Provider gives access to the context to its children
		<AnnuityContext.Provider value={contextValue}>
			{children}
		</AnnuityContext.Provider>
	)
}

export { AnnuityContext, defaultAnnuityConfig, AnnuityContextProvider }
export type { IAnnuityConfig }
