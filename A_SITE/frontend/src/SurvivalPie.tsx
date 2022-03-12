import { CoupleContext } from 'CoupleContext'
import { useContext } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

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

function MyChart() {
	const { couple } = useContext(CoupleContext)
	const surData = couple.getSurvivalData()

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
		<PieChart height={140} width={140}>
			<Pie
				data={data}
				isAnimationActive={false}
				dataKey='value'
				cx={65}
				cy={65}
				label={renderCustomizedLabel}
				innerRadius={3}
				outerRadius={52}
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
				cx={65}
				cy={65}
				innerRadius={55}
				outerRadius={66}
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
