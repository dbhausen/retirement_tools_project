import { Grid } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
} from "recharts";

interface IDatum {
  name: string;
  value: number;
}

interface ISurvivalData {
  data: IDatum[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
  return (
    <PieChart height={160} width={300}>
      <Pie
        data={props.data}
        isAnimationActive={false}
        dataKey="value"
        cx={90}
        cy={80}
        label={renderCustomizedLabel}
        innerRadius={3}
        outerRadius={55}
        paddingAngle={2}
        fill="#8884d8"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export { MyChart };
