import { useEffect, useState, useRef } from "react";
import BreadCrumb from "../views/breadcrumb";
import mqtt from "mqtt/dist/mqtt";
import AreaChartComponent from "./chartType/linechart";
const host = "ws://broker.emqx.io:8083/mqtt";
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "test",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
};
const client = mqtt.connect(host, options);

const addZero = (number) => {
  if (number < 10) {
    return "0" + number.toString();
  }
  return number.toString();
};
const getDate = () => {
  const now = new Date();
  return (
    " " +
    addZero(now.getHours()) +
    ":" +
    addZero(now.getMinutes()) +
    ":" +
    addZero(now.getSeconds()) +
    " "
  );
};
var lastDate = "";
const Dashboard = () => {
  const [data, setData] = useState({});
  const [ListCapteurs, setListCapteurs] = useState(() => {
    if (localStorage.getItem("data")) {
      return JSON.parse(localStorage.getItem("data"));
    }
    return [];
  });

  const [ListTopic, setListTopic] = useState([]);

  useEffect(() => {
    const chargerTopic = async () => {
      let newJSON = {};
      await ListCapteurs.map((item) => {
        newJSON[item.topic] = [];
        setListTopic((presData) => [...presData, item.topic]);
      });
      return newJSON;
    };
    const loadTopic = async () => {
      const topicData = await chargerTopic();
      setData(topicData);
    };
    loadTopic();
  }, [ListCapteurs]);

  const countRef = useRef(0);
  countRef.ListTopic = ListTopic;
  countRef.data = data;

  function change(message) {
    var date = getDate();

    if (date !== lastDate) {
      lastDate = date;
      countRef.ListTopic.map((itemTopic) => {
        itemTopic.map((topic, key) => {
          let newdata = data;
          if (newdata[topic]) {
            if (JSON.parse(message.toString())[topic]) {
              newdata[topic].push({
                name: date,
                value: parseFloat(JSON.parse(message.toString())[topic]),
              });
            }
          } else {
            if (JSON.parse(message.toString())[topic]) {
              newdata[topic] = [
                {
                  name: date,
                  value: parseFloat(JSON.parse(message.toString())[topic]),
                },
              ];
            }
          }
          setData({ ...newdata });
        });
      });
    }
  }
  useEffect(() => {
    client.on("connect", () => {
      console.log("connected");
      client.subscribe("/RecordTop/data");
    });
    client.on("message", (topic, message) => {
      console.log(message.toString());
      change(message);
    });
  }, []);

  return (
    <div>
      <BreadCrumb page="Tableau de bord" />
      <div className="row">
        {ListCapteurs.map((capteur, key) => {
          return capteur.topic.map((topicItem, key) => {
            return (
              <AreaChartComponent
                key={key}
                data={data}
                capteur={capteur}
                topic={topicItem}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Dashboard;
