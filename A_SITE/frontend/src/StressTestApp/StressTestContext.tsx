import React, { createContext, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

interface IStressTestConfig {
	earnedIncomeSpouse1: string
}

const defaultStressTestConfig: IStressTestConfig = {
	earnedIncomeSpouse1: '50000',
}

interface IStressTestContext {
	stressTestConfig: IStressTestConfig
	setStressTestConfig: React.Dispatch<React.SetStateAction<IStressTestConfig>>
	storedStressTestConfig: IStressTestConfig
	setStoredStressTestConfig: React.Dispatch<
		React.SetStateAction<IStressTestConfig>
	>
}

const StressTestContext = createContext<IStressTestContext>({
	stressTestConfig: defaultStressTestConfig,
	setStressTestConfig: () => {},
	storedStressTestConfig: defaultStressTestConfig,
	setStoredStressTestConfig: () => {},
})

const StressTestContextProvider = ({ children }: any) => {
	const [stressTestConfig, setStressTestConfig] = useState<IStressTestConfig>(
		defaultStressTestConfig
	)

	const [storedStressTestConfig, setStoredStressTestConfig] =
		useLocalStorage<IStressTestConfig>(
			'stresstest-config',
			defaultStressTestConfig
		)

	if (useIsFirstRender()) {
		setStressTestConfig(storedStressTestConfig)
	}

	const contextValue = useMemo(
		() => ({
			stressTestConfig,
			setStressTestConfig,
			storedStressTestConfig,
			setStoredStressTestConfig,
		}),
		[
			stressTestConfig,
			setStressTestConfig,
			storedStressTestConfig,
			setStoredStressTestConfig,
		]
	)
	return (
		// the Provider gives access to the context to its children
		<StressTestContext.Provider value={contextValue}>
			{children}
		</StressTestContext.Provider>
	)
}

export { StressTestContext, defaultStressTestConfig, StressTestContextProvider }
export type { IStressTestConfig }
