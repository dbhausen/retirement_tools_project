/* eslint-disable max-classes-per-file */
const MALE_CHANCE_OF_DEATH_THIS_YEAR = 1
const MALE_NUMBER_OF_LIVES = 2
const MALE_LIFE_EXPECTANCY = 3

const FEMALE_CHANCE_OF_DEATH_THIS_YEAR = 4
const FEMALE_NUMBER_OF_LIVES = 5
const FEMALE_LIFE_EXPECTANCY = 6

const MALE = 'Male'
const FEMALE = 'Female'

const LIFE = [
	[0, 0.006304, 100000, 75.97, 0.005229, 100000, 80.96],
	[1, 0.000426, 99370, 75.45, 0.000342, 99477, 80.39],
	[2, 0.00029, 99327, 74.48, 0.000209, 99443, 79.42],
	[3, 0.000229, 99298, 73.5, 0.000162, 99422, 78.43],
	[4, 0.000162, 99276, 72.52, 0.000143, 99406, 77.45],
	[5, 0.000146, 99260, 71.53, 0.000125, 99392, 76.46],
	[6, 0.000136, 99245, 70.54, 0.000113, 99379, 75.47],
	[7, 0.000127, 99232, 69.55, 0.000104, 99368, 74.47],
	[8, 0.000115, 99219, 68.56, 0.000097, 99358, 73.48],
	[9, 0.000103, 99208, 67.57, 0.000093, 99348, 72.49],
	[10, 0.000097, 99197, 66.57, 0.000092, 99339, 71.5],
	[11, 0.000109, 99188, 65.58, 0.000098, 99330, 70.5],
	[12, 0.000151, 99177, 64.59, 0.000113, 99320, 69.51],
	[13, 0.000232, 99162, 63.6, 0.000138, 99309, 68.52],
	[14, 0.000343, 99139, 62.61, 0.000172, 99295, 67.53],
	[15, 0.000465, 99105, 61.63, 0.000211, 99278, 66.54],
	[16, 0.000588, 99059, 60.66, 0.000251, 99257, 65.55],
	[17, 0.00072, 99001, 59.7, 0.000293, 99232, 64.57],
	[18, 0.000858, 98929, 58.74, 0.000336, 99203, 63.59],
	[19, 0.000999, 98845, 57.79, 0.000379, 99170, 62.61],
	[20, 0.001146, 98746, 56.85, 0.000425, 99132, 61.63],
	[21, 0.001288, 98633, 55.91, 0.000472, 99090, 60.66],
	[22, 0.001407, 98506, 54.98, 0.000515, 99044, 59.69],
	[23, 0.001494, 98367, 54.06, 0.000551, 98993, 58.72],
	[24, 0.001556, 98220, 53.14, 0.000582, 98938, 57.75],
	[25, 0.00161, 98067, 52.22, 0.000612, 98880, 56.78],
	[26, 0.001665, 97910, 51.31, 0.000646, 98820, 55.82],
	[27, 0.001717, 97746, 50.39, 0.000684, 98756, 54.85],
	[28, 0.001767, 97579, 49.48, 0.000729, 98689, 53.89],
	[29, 0.001817, 97406, 48.56, 0.000779, 98617, 52.93],
	[30, 0.001865, 97229, 47.65, 0.000833, 98540, 51.97],
	[31, 0.001911, 97048, 46.74, 0.000887, 98458, 51.01],
	[32, 0.00196, 96862, 45.83, 0.000939, 98370, 50.06],
	[33, 0.002014, 96672, 44.92, 0.000988, 98278, 49.1],
	[34, 0.002071, 96478, 44.01, 0.001034, 98181, 48.15],
	[35, 0.002138, 96278, 43.1, 0.001085, 98079, 47.2],
	[36, 0.002211, 96072, 42.19, 0.001143, 97973, 46.25],
	[37, 0.002279, 95860, 41.28, 0.001205, 97861, 45.3],
	[38, 0.002342, 95641, 40.37, 0.001271, 97743, 44.36],
	[39, 0.002405, 95417, 39.47, 0.001345, 97619, 43.41],
	[40, 0.002482, 95188, 38.56, 0.001429, 97488, 42.47],
	[41, 0.002583, 94951, 37.65, 0.001524, 97348, 41.53],
	[42, 0.00271, 94706, 36.75, 0.00163, 97200, 40.59],
	[43, 0.00287, 94450, 35.85, 0.001748, 97042, 39.66],
	[44, 0.003064, 94178, 34.95, 0.001881, 96872, 38.73],
	[45, 0.003285, 93890, 34.06, 0.002029, 96690, 37.8],
	[46, 0.003538, 93581, 33.17, 0.002195, 96494, 36.88],
	[47, 0.003834, 93250, 32.28, 0.002386, 96282, 35.96],
	[48, 0.004178, 92893, 31.41, 0.002605, 96052, 35.04],
	[49, 0.004569, 92505, 30.54, 0.002851, 95802, 34.13],
	[50, 0.004997, 92082, 29.67, 0.003118, 95529, 33.23],
	[51, 0.005462, 91622, 28.82, 0.003403, 95231, 32.33],
	[52, 0.005971, 91122, 27.98, 0.003714, 94907, 31.44],
	[53, 0.006526, 90577, 27.14, 0.004052, 94554, 30.55],
	[54, 0.007125, 89986, 26.32, 0.004415, 94171, 29.68],
	[55, 0.007766, 89345, 25.5, 0.004813, 93755, 28.81],
	[56, 0.008445, 88651, 24.7, 0.005233, 93304, 27.94],
	[57, 0.009156, 87903, 23.9, 0.005647, 92816, 27.09],
	[58, 0.009897, 87098, 23.12, 0.006043, 92292, 26.24],
	[59, 0.010671, 86236, 22.34, 0.006441, 91734, 25.39],
	[60, 0.011519, 85316, 21.58, 0.006886, 91143, 24.56],
	[61, 0.012419, 84333, 20.83, 0.007391, 90515, 23.72],
	[62, 0.013307, 83286, 20.08, 0.007931, 89846, 22.9],
	[63, 0.014164, 82177, 19.35, 0.008508, 89134, 22.07],
	[64, 0.015032, 81013, 18.62, 0.009142, 88375, 21.26],
	[65, 0.016013, 79795, 17.89, 0.009874, 87568, 20.45],
	[66, 0.017138, 78518, 17.18, 0.010717, 86703, 19.65],
	[67, 0.018362, 77172, 16.47, 0.01166, 85774, 18.86],
	[68, 0.019693, 75755, 15.77, 0.012711, 84774, 18.07],
	[69, 0.021174, 74263, 15.07, 0.013894, 83696, 17.3],
	[70, 0.022889, 72691, 14.39, 0.015285, 82533, 16.54],
	[71, 0.024869, 71027, 13.71, 0.016878, 81272, 15.79],
	[72, 0.027095, 69261, 13.05, 0.018607, 79900, 15.05],
	[73, 0.029587, 67384, 12.4, 0.020466, 78413, 14.32],
	[74, 0.032394, 65390, 11.76, 0.022522, 76809, 13.61],
	[75, 0.035668, 63272, 11.14, 0.024929, 75079, 12.92],
	[76, 0.039396, 61015, 10.53, 0.027729, 73207, 12.23],
	[77, 0.043453, 58611, 9.94, 0.030855, 71177, 11.57],
	[78, 0.047826, 56065, 9.37, 0.034321, 68981, 10.92],
	[79, 0.052649, 53383, 8.82, 0.038211, 66613, 10.29],
	[80, 0.058206, 50573, 8.28, 0.042771, 64068, 9.68],
	[81, 0.064581, 47629, 7.76, 0.047992, 61328, 9.09],
	[82, 0.071657, 44553, 7.26, 0.053678, 58385, 8.52],
	[83, 0.079465, 41361, 6.79, 0.05981, 55251, 7.98],
	[84, 0.088141, 38074, 6.33, 0.066584, 51946, 7.45],
	[85, 0.097854, 34718, 5.89, 0.074258, 48487, 6.95],
	[86, 0.108747, 31321, 5.48, 0.083053, 44887, 6.47],
	[87, 0.120919, 27915, 5.08, 0.093123, 41159, 6.01],
	[88, 0.134425, 24539, 4.71, 0.10454, 37326, 5.57],
	[89, 0.149273, 21241, 4.37, 0.117305, 33424, 5.16],
	[90, 0.165452, 18070, 4.05, 0.131392, 29503, 4.78],
	[91, 0.182935, 15080, 3.75, 0.146753, 25627, 4.43],
	[92, 0.201679, 12322, 3.48, 0.163331, 21866, 4.11],
	[93, 0.221637, 9837, 3.23, 0.181064, 18294, 3.81],
	[94, 0.242747, 7656, 3.01, 0.199886, 14982, 3.55],
	[95, 0.263672, 5798, 2.81, 0.218908, 11987, 3.31],
	[96, 0.284014, 4269, 2.64, 0.237815, 9363, 3.09],
	[97, 0.303355, 3057, 2.49, 0.256265, 7136, 2.9],
	[98, 0.321268, 2129, 2.36, 0.273894, 5308, 2.73],
	[99, 0.337332, 1445, 2.24, 0.290328, 3854, 2.58],
	[100, 0.354198, 958, 2.12, 0.307747, 2735, 2.42],
	[101, 0.371908, 619, 2.01, 0.326212, 1893, 2.28],
	[102, 0.390503, 388, 1.9, 0.345785, 1276, 2.14],
	[103, 0.410029, 237, 1.8, 0.366532, 835, 2.01],
	[104, 0.43053, 140, 1.7, 0.388524, 529, 1.88],
	[105, 0.452057, 80, 1.6, 0.411835, 323, 1.76],
	[106, 0.474659, 44, 1.51, 0.436546, 190, 1.65],
	[107, 0.498392, 23, 1.42, 0.462738, 107, 1.54],
	[108, 0.523312, 11, 1.34, 0.490503, 58, 1.44],
	[109, 0.549478, 5, 1.26, 0.519933, 29, 1.34],
	[110, 0.576951, 2, 1.18, 0.551129, 14, 1.24],
	[111, 0.605799, 1, 1.1, 0.584196, 6, 1.15],
	[112, 0.636089, 0, 1.03, 0.619248, 3, 1.06],
	[113, 0.667893, 0, 0.96, 0.656403, 1, 0.98],
	[114, 0.701288, 0, 0.9, 0.695787, 0, 0.91],
	[115, 0.736353, 0, 0.84, 0.736353, 0, 0.84],
	[116, 0.77317, 0, 0.78, 0.77317, 0, 0.78],
	[117, 0.811829, 0, 0.72, 0.811829, 0, 0.72],
	[118, 0.85242, 0, 0.66, 0.85242, 0, 0.66],
	[119, 0.895041, 0, 0.61, 0.895041, 0, 0.61],
]

interface IPerson {
	name: string
	age: number
	sex: string
}
interface ICouple {
	person1: IPerson
	person2: IPerson
	targetAge: number
	married: boolean
}

interface ISurvival {
	neither: number
	one: number
	both: number
}

class Person implements IPerson {
	name: string

	age: number

	sex: string

	constructor(props: IPerson) {
		this.name = props.name
		this.sex = props.sex
		this.age = props.age
	}

	static getProbabilityOfDeathAtAge = (
		person: IPerson,
		targetAge: number
	): number => {
		const { sex } = person
		if (targetAge > 119) return 0.9
		if (targetAge < 0) return 0
		if (sex === MALE) return LIFE[targetAge][MALE_CHANCE_OF_DEATH_THIS_YEAR]
		return LIFE[targetAge][FEMALE_CHANCE_OF_DEATH_THIS_YEAR]
	}

	static getProbabilityOfDeathByAge = (
		person: IPerson,
		targetAge: number
	): number => {
		// Return the probability that this individual will die by target age.
		const { age, sex } = person
		if (targetAge > 117) return 1
		if (targetAge < 0) return 0
		if (targetAge < age) return 0

		const livesColumn =
			sex === FEMALE ? FEMALE_NUMBER_OF_LIVES : MALE_NUMBER_OF_LIVES

		const startLives = LIFE[age][livesColumn]
		const endLives = LIFE[targetAge][livesColumn]

		return (startLives - endLives) / startLives
	}

	// Return the probability that this individual will live to age.//
	static getProbabilityOfLivingToAge = (
		person: IPerson,
		targetAge: number
	): number => 1 - Person.getProbabilityOfDeathByAge(person, targetAge)

	static getLifeExpectancy = (person: IPerson): number => {
		// Returns the expected age to be reached by person of this age and sex.
		const { age, sex } = person
		if (sex === MALE) {
			return LIFE[age][MALE_LIFE_EXPECTANCY] + age
		}
		return LIFE[age][FEMALE_LIFE_EXPECTANCY] + age
	}
}

class Couple implements ICouple {
	person1: IPerson

	person2: IPerson

	targetAge: number

	married: boolean

	constructor(props: ICouple) {
		this.person1 = props.person1
		this.person2 = props.person2
		this.targetAge = props.targetAge
		this.married = props.married
	}

	static getAgeOfOldest = (couple: ICouple): number => {
		if (!couple.married) return couple.person1.age

		return couple.person1.age > couple.person2.age
			? couple.person1.age
			: couple.person2.age
	}

	static getAgeOfYoungest = (couple: ICouple): number => {
		if (!couple.married) return couple.person1.age
		return couple.person1.age < couple.person2.age
			? couple.person1.age
			: couple.person2.age
	}

	static getBirthYearOfYoungest = (couple: ICouple): number =>
		new Date().getFullYear() - Couple.getAgeOfYoungest(couple)

	static getProbabilityOfAtLeastOneReachingTargetAge = (
		couple: ICouple,
		targetAge: number
	): number => {
		// Returns the probability that at least one of this couple will reach target age.//
		const p2 = couple.married
			? Person.getProbabilityOfDeathByAge(couple.person2, targetAge)
			: 1

		return (
			1 - Person.getProbabilityOfDeathByAge(couple.person1, targetAge) * p2
		)
	}

	static getProbabilityOfAtLeastOneReachingYear = (
		couple: ICouple,
		year: number
	): number => {
		// Returns the probability that at least one of this couple will reach year.//
		const currantYear = new Date().getFullYear()
		const p1Target = year - currantYear + couple.person1.age
		const p2Target = year - currantYear + couple.person2.age

		const p2 = couple.married
			? Person.getProbabilityOfDeathByAge(couple.person2, p2Target)
			: 1

		return (
			1 - Person.getProbabilityOfDeathByAge(couple.person1, p1Target) * p2
		)
	}

	static getProbabilityOfNeitherReachingTargetAge = (
		couple: ICouple,
		targetAge: number
	): number =>
		// Returns the probability that neither one of this couple will reach target age.//
		{
			const p2 = couple.married
				? Person.getProbabilityOfDeathByAge(couple.person2, targetAge)
				: 1
			return (
				Person.getProbabilityOfDeathByAge(couple.person1, targetAge) * p2
			)
		}

	static getProbabilityOfBothReachingTargetAge = (
		couple: ICouple,
		targetAge: number
	): number =>
		// Returns the probability that both of this couple will reach target age.
		{
			const p2 = couple.married
				? Person.getProbabilityOfLivingToAge(couple.person2, targetAge)
				: 0

			return (
				Person.getProbabilityOfLivingToAge(couple.person1, targetAge) * p2
			)
		}

	static getProbabilityOfExactlyOneReachingTargetAge = (
		couple: ICouple,
		targetAge: number
	): number =>
		// Returns the probability that exactly one of this couple will reach target age.//

		1 -
		Couple.getProbabilityOfBothReachingTargetAge(couple, targetAge) -
		Couple.getProbabilityOfNeitherReachingTargetAge(couple, targetAge)

	static getSurvivalData = (couple: ICouple): ISurvival => ({
		neither: Couple.getProbabilityOfNeitherReachingTargetAge(
			couple,
			couple.targetAge
		),
		one: Couple.getProbabilityOfExactlyOneReachingTargetAge(
			couple,
			couple.targetAge
		),
		both: Couple.getProbabilityOfBothReachingTargetAge(
			couple,
			couple.targetAge
		),
	})
}

export { Couple, Person, MALE, FEMALE }
