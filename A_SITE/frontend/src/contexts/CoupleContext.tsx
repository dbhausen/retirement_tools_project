import React, { createContext, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'
import { Couple, FEMALE, MALE, Person } from '../AnnuityCalculatorApp/Couple'

const fixed1 = new Intl.NumberFormat('en-us', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
})

const fixed = new Intl.NumberFormat('en-us', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})

const currency = new Intl.NumberFormat('en-us', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})

const displayFixed = (n: number): string => fixed.format(n)

const displayFixed1 = (n: number): string => fixed1.format(n)

const displayCurrency = (n: number): string => currency.format(n)

const displayPercent = (percent: number) => `${(percent * 100).toFixed(0)}%`

const displayPercent3 = (percent: number) => `${(percent * 100).toFixed(3)}%`

const spouse1 = new Person({
	name: 'spouse1',
	sex: MALE,
	age: 50,
})

const spouse2 = new Person({
	name: 'spouse2',
	sex: FEMALE,
	age: 50,
})

const defaultCouple = new Couple({
	person1: spouse1,
	person2: spouse2,
	married: true,
	targetAge: 90,
})

interface ICoupleContext {
	couple: Couple
	setCouple: React.Dispatch<React.SetStateAction<Couple>>
	storedCouple: Couple
	setStoredCouple: React.Dispatch<React.SetStateAction<Couple>>
}

const CoupleContext = createContext<ICoupleContext>({
	couple: defaultCouple,
	setCouple: () => {},
	storedCouple: defaultCouple,
	setStoredCouple: () => {},
})

const CoupleContextProvider = ({ children }: any) => {
	const [storedCouple, setStoredCouple] = useLocalStorage<Couple>(
		'couple',
		defaultCouple
	)
	const [couple, setCouple] = useState<Couple>(defaultCouple)

	if (useIsFirstRender()) {
		setCouple(storedCouple)
	}

	const contextValue = useMemo(
		() => ({
			couple,
			setCouple,
			storedCouple,
			setStoredCouple,
		}),
		[couple, setCouple, storedCouple, setStoredCouple]
	)
	return (
		// the Provider gives access to the context to its children
		<CoupleContext.Provider value={contextValue}>
			{children}
		</CoupleContext.Provider>
	)
}

export {
	CoupleContext,
	defaultCouple,
	displayCurrency,
	displayPercent,
	displayPercent3,
	displayFixed1,
	displayFixed,
	CoupleContextProvider,
}
