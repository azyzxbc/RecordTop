import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts";

const AreaChartComponent = ({ data, capteur, topic }) => {
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (data[topic]) {
      if (JSON.stringify(chartData) === JSON.stringify(data[topic])) {
        //console.log("rod belk");
        // setConnected(false);
      } else {
        setChartData([...data[topic]]);
        setConnected(true);
      }
    }
  }, [topic, data]);
  return (
    <div className={"mb-4 col-12 col-lg-" + capteur.width}>
      <div className="card shadow-sm">
        <div className="card-header">
          {capteur.name} / {topic}
        </div>
        <div className="card-body position-relative px-0">
          <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorvalue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1cb5d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1cb5d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorvalue)"
              />
            </AreaChart>
          </ResponsiveContainer>
          {connected ? (
            ""
          ) : (
            <div className="NonConnected">
              <p>Capteur non connecté</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaChartComponent;
