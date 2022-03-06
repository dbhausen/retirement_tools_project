import { Couple, Person } from 'life'
import React, { createContext } from 'react'

const spouse1 = new Person({
	name: 'spouse1',
	sex: 'Male',
	dateOfBirth: new Date('7/24/1955'),
})

const spouse2 = new Person({
	name: 'spouse2',
	sex: 'Female',
	dateOfBirth: new Date('12/4/1956'),
})

const couple = new Couple({ person1: spouse1, person2: spouse2, targetAge: 90 })

interface ICoupleContext {
	couple: Couple
	setCouple: React.Dispatch<React.SetStateAction<Couple>>
}

const CoupleContext = createContext<ICoupleContext>({
	couple,
	setCouple: () => {},
})

export { CoupleContext, couple as defaultCouple }
