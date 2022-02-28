import { PieChart, Pie, Cell } from "recharts";

interface IDatum {
  name: string;
  value: number;
}

interface ISurvivalData {
  data: IDatum[];
}

const COLORS = ["#546E7A", "#00C49F", "#FF8042"];
const COLORS2 = ["#546E7A", "#2E7D32"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//    <ResponsiveContainer width="70%" height="100%">

const MyChart = (props: ISurvivalData) => {
  const data02 = [
    { name: "Neither", value: props.data[0].value },
    { name: "Either", value: props.data[1].value + props.data[2].value },
  ];
  return (
    <PieChart height={160} width={300}>
      <Pie
        data={props.data}
        isAnimationActive={false}
        dataKey="value"
        cx={67}
        cy={70}
        label={renderCustomizedLabel}
        innerRadius={3}
        outerRadius={52}
        paddingAngle={2}
        fill="#8884d8"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Pie
        data={data02}
        isAnimationActive={false}
        dataKey="value"
        cx={67}
        cy={70}
        innerRadius={55}
        outerRadius={66}
        paddingAngle={2}
        fill="#8884d8"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export { MyChart, COLORS, COLORS2 };
