/* eslint-disable */
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';
// import EventEmitter from 'eventemitter3';
// import OrderBook from '../OrderBook';
import { Wrapper } from './style';

// const EE = new EventEmitter();

class DepthChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        chart: {
          margin: [0, 0, 0, 0],
          width: 200,
          backgroundColor: 'transparent',
          type: 'area',
          inverted: true,
          events: {
            load() {
              // // set up the updating of the chart each second
              // const series = this.series[0];
              // const columnSeries = this.series[1];
              // let point = [870.46, 55];
              // let columnPoint = [860.51, 58];
              // let depth = 58
              // setInterval(function() {
              //   depth += 10
              //   const point1 = [columnPoint[0], depth];
              //   columnSeries.addPoint(point1, true, true);
              //   // const columnPoint1 = [columnPoint[0] - (Math.random() * 2), columnPoint[1] + 1];
              //   // columnSeries.addPoint(point1, true, true);
              // }, 1000)
              // EE.on('DepthChart-update', () => {
              // });
            },
          },
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        credits: {
          display: false,
        },
        xAxis: {
          reversed: false,
          visible: false,
          title: {
            enabled: false,
          },
          labels: {
            format: '{value} USD',
          },
        },
        yAxis: {
          title: {
            text: 'BTC',
          },
          labels: {
            format: '{value}°',
          },
          reversed: true,
          visible: false,
          lineWidth: 2,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x} USD,  {point.y} Unit',
          style: {
            // color: '#ffffff',
          },
        },

        series: [
          {
            name: 'Asks',
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1.1 },
              stops: [
                [0, 'rgba(255,77,154, 0.1)'],
                [1, 'rgba(255,77,154, 1)'],
              ],
            },
            step: 'right',
            data: [
              [867.29, 0],
              [867.30, 1],
              [867.31, 16],
              [867.32, 17],
              [867.33, 32],
              [867.34, 32],
              [867.37, 33],
              [867.38, 33],
              [867.39, 34],
              [867.40, 34],
              [868.42, 35],
              [869.45, 54],
              [870.46, 55],
            ],
          }, {
            name: 'Bids',
            color: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1.1 },
              stops: [
                [0, 'rgba(70,233,106, 0.1)'],
                [1, 'rgba(70,233,106, 1)'],
              ],
            },
            step: 'left',
            data: [
              [860.51, 58],
              [861.52, 56],
              [862.54, 55],
              [863.55, 55],
              [866.56, 49],
              [866.57, 37],
              [866.58, 36],
              [866.69, 35],
              [866.70, 31],
              [866.71, 31],
              [866.72, 30],
              [866.73, 23],
              [866.79, 1],
            ],
          },

        ],
      },
    };
  }
  // componentDidMount() {
  //   let depth = 58;
  //   setInterval(() => {
  //     EE.emit('DepthChart-update');
  //     const chart = this.refs.chart.getChart();
  //     // set up the updating of the chart each second
  //     const series = chart.series[0];
  //     const columnSeries = chart.series[1];
  //     const point = [870.46, 55];
  //     const columnPoint = [860.51, 58];
  //     depth += 10;
  //     const point1 = [columnPoint[0], depth];
  //     columnSeries.addPoint(point1, true, true);
  //     // this.setState({
  //     //   series1: [
  //     //     [860.51, 58],
  //     //     [861.52, 56],
  //     //     [862.54, 55],
  //     //     [863.55, 55],
  //     //     [866.56, 49],
  //     //     [866.57, 37],
  //     //     [866.58, 36],
  //     //     [866.69, 35],
  //     //     [866.70, 31],
  //     //     [866.71, 31],
  //     //     [866.72, 30],
  //     //     [866.73, 23],
  //     //     [866.79, 1],
  //     //   ]
  //     // })
  //   }, 1000);
  // }
  // componentWillUnmount() {
  //   EE.removeAllListeners('DepthChart-update');
  // }
  render() {
    const { config } = this.state;
    // const { incrementedData, decrementedData, amountUSD } = this.props;
    return (
      <Wrapper className={this.props.className}>
        <ReactHighcharts config={config} ref="chart" />
        {/* <OrderBook incrementedData={incrementedData} decrementedData={decrementedData} amountUSD={amountUSD} /> */}
      </Wrapper>
    );
  }
}
DepthChart.propTypes = {
    /**
   * Table data of incremented values
   */
  incrementedData: PropTypes.array,
  /**
   * Table data of decremented values
   */
  decrementedData: PropTypes.array,
  amountUSD: PropTypes.number,
  className: PropTypes.string,
};
export default DepthChart;