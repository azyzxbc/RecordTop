import { useEffect, useState } from "react";
import {
  ReferenceLine,
  CartesianGrid,
  BarChart,
  Brush,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts";

const BrushBarChartComponent = ({ data, capteur }) => {
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (data[capteur.topic]) {
      if (JSON.stringify(chartData) === JSON.stringify(data[capteur.topic])) {
        //console.log("rod belk");
        // setConnected(false);
      } else {
        setChartData([...data[capteur.topic]]);
        setConnected(true);
      }
    }
  }, [capteur.topic, data]);
  return (
    <div className={"mb-4 col-12 col-lg-" + capteur.width}>
      <div className="card shadow-sm">
        <div className="card-header">{capteur.name}</div>
        <div className="card-body position-relative px-0">
          <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="name" height={30} stroke="#1cb5d8" />
              <Bar dataKey="value" fill="#1cb5d8" />
            </BarChart>
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

export default BrushBarChartComponent;
