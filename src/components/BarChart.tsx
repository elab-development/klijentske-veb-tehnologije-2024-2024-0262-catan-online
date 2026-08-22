import './BarChart.css';

interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartItem[];
  color?: string;
}

const BarChart = ({ data, color }: BarChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bar-chart">
      {data.map((item) => (
        <div key={item.label} className="bar-chart__column">
          <div className="bar-chart__bar-track">
            <div
              className="bar-chart__bar"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="bar-chart__value">{item.value}</span>
          <span className="bar-chart__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;