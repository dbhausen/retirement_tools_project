/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { Couple } from './Couple'
import { CoupleContext } from './CoupleContext'

const COLORS = ['#37474F', '#00897B', '#43A047']
const COLORS2 = ['#37474F', '#1B5E20']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.35
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	)
}
const renderCustomizedLabelSingle = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: any) => <text />

function MyChart() {
	const { couple } = useContext(CoupleContext)
	const surData = Couple.getSurvivalData(couple)
	const renderSingle = !couple.married
		? renderCustomizedLabel
		: renderCustomizedLabelSingle

	let insideInner = 3
	let insideOuter = 46
	let outsideInner = 48
	let outsideOuter = 56

	if (!couple.married) {
		insideInner = 0
		insideOuter = 0
		outsideInner = 3
		outsideOuter = 56
	}
	const cx = 65
	const cy = 52

	const data = [
		{ name: 'Neither', value: surData.neither },
		{ name: 'One', value: surData.one },
		{ name: 'Both', value: surData.both },
	]

	const data02 = [
		{ name: 'Neither', value: surData.neither },
		{ name: 'Either', value: surData.one + surData.both },
	]
	return (
		<PieChart height={120} width={140}>
			<Pie
				data={data}
				isAnimationActive={false}
				dataKey='value'
				cx={cx}
				cy={cy}
				label={renderCustomizedLabel}
				innerRadius={insideInner}
				outerRadius={insideOuter}
				paddingAngle={2}
				fill='#8884d8'
			>
				{data.map((entry, index) => (
					<Cell
						key={`cell-${entry.name}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>

			<Pie
				data={data02}
				isAnimationActive={false}
				dataKey='value'
				cx={cx}
				cy={cy}
				label={renderSingle}
				innerRadius={outsideInner}
				outerRadius={outsideOuter}
				paddingAngle={2}
				fill='#8884d8'
			>
				{data.map((entry, index) => (
					<Cell
						key={`cell-${entry.name}`}
						fill={COLORS2[index % COLORS2.length]}
					/>
				))}
			</Pie>
		</PieChart>
	)
}

export { MyChart, COLORS, COLORS2 }
