import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { IsNullOrEmpty } from "../../Core/Helper";

const { generateColor } = require("random-color-generator2");

const colorPointer = generateColor(false);
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];

/**
 *
 */
export default class ChartComponent extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  constructor(props) {
    super(props);
    this.state = {
      dataList: data,
      dataKeyList: ["pv", "uv", "amt"],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={this.props.dataSource ? this.props.dataSource : []}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.props.keyList && this.props.keyList.length > 0 ? (
          this.props.keyList.map(
            // eslint-disable-next-line
            (val, ind) => {
              if (!IsNullOrEmpty(val)) {
                return (
                  <Bar
                    key={ind + "charbar"}
                    dataKey={val}
                    fill={colorPointer.next().value}
                  />
                );
              }
            }
          )
        ) : (
          <Bar />
        )}
        {/*<Bar dataKey="pv" fill="#8884d8" />*/}
        {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
      </BarChart>
    );
  }
}
