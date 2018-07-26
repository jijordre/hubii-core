import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import EventEmitter from 'eventemitter3';
import './CandleStick.css';

const EE = new EventEmitter();

/*eslint-disable */
export default class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    };
  }
  componentDidMount() {
    // setInterval(() => {
    //   EE.emit('CandleStick-update');
    // }, 1000);
    this.updateData();
  }
  componentWillUnmount() {
    EE.removeAllListeners('CandleStick-update');
  }
  updateData() {
    fetch('https://raw.githubusercontent.com/smartvikisogn/cryptocurrency/master/bitcoin.json')
    .then((res) => res.json())
    .then((data) => {
       // split the data set into ohlc and volume
      const ohlc = [];
      const volume = [];
      const dataLength = data.length;
      let i = 0;
      let date;
      let temp;

      for (i; i < dataLength; i += 1) {
  // get year-month-day
        date = data[i].date.split('-').reverse();

  // change month with day to get yyyy-(m)m-(d)d
        temp = date[2];
        date[2] = date[1];
        date[1] = temp;

  // optional change to get yyyy-mm-dd
  // (m)m -> mm
        if (date[1].length < 2) {
          date[1] = `0${date[1]}`;
        }
  // (d)d -> dd
        if (date[2].length < 2) {
          date[2] = `0${date[2]}`;
        }

  // get timestamp
        date = new Date(date.join('-')).getTime();
        ohlc.push([
          date, // the date
          data[i].open, // open
          data[i].high, // high
          data[i].low, // low
          data[i].close, // close
        ]);

        volume.push([
          date, // the date
          data[i].volume, // the volume
        ]);
      }
      const config = {
        chart: {
          events: {
            load() {
                  // set up the updating of the chart each second
              const series = this.series[0];
              const columnSeries = this.series[1];
              let time = Date.now();
                // debugger;
              EE.on('CandleStick-update', () => {
                // debugger;
                const randNum = Math.round(Math.random() * 20000);
                const point = [
                  time,
                  randNum + Math.round(Math.random() * 1000),
                  randNum + Math.round(Math.random() * 4000),
                  randNum + Math.round(Math.random() * 1000),
                  randNum + Math.round(Math.random() * 1000),
                ];
                // console.log('point', point);
                series.addPoint(point, true, true);
                const columnPoint = [
                  time,
                  Math.round(Math.random() * 18000000000) + 5000000,
                ];
                columnSeries.addPoint(columnPoint, true, true);
                time += 86400000;
              });
            },
          },
        },

        rangeSelector: {
          selected: 1,
          inputEnabled: false,
        },
        scrollbar: {
          enabled: false,
        },

        yAxis: [{
          labels: {
            align: 'right',
            x: -3,
            style: {
              color: '#ffffff',
              opacity: 0.6,
              width: '150px',
            },
            formatter: function() {
              console.log(this.value, this.x, this.y, this);
              return `<div style="padding-left:20px;">${this.value}</div>`;
            },
            useHTML: true
          },
          height: '80%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        }, {
          labels: {
            align: 'right',
            x: -3,
            style: {
              color: '#ffffff',
              opacity: 0.6,
            },
          },
          top: '80%',
          height: '20%',
          offset: 0,
          lineWidth: 2,
        }],
        xAxis: {
          labels: {
            style: {
              color: '#ffffff',
              opacity: 0.6,
            },
          },
        },
        tooltip: {
          backgroundColor: 'red',
          borderWidth: 0,
          borderRadius: 0,
          style: {
            color: '#ffffff',
          },
          followTouchMove: false,
          crosshairs: false,
          positioner: function () {
            return { x: 10, y: 35 };
          },
          shadow: false,
          split: false,
          useHTML: true,
          formatter: function () {
            const {high, low, close, open, volume, y} = this.point;
            if (!high) {
              return 
            }
            return `<div>
                      H <span class="candlestickchart-tooltip-value">${high}</span> 
                      L <span class="candlestickchart-tooltip-value">${low}</span>
                      C <span class="candlestickchart-tooltip-value">${close}</span>
                      O <span class="candlestickchart-tooltip-value">${open}</span>
                    </div>`
          }
        },

        series: [{
          type: 'candlestick',
          name: '<b>Bitcoin</b> Historical Data in <b>USD</b>',
          data: ohlc,
        },
        {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
        },
        ],
      };
      this.setState({
        config,
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
  }
  render() {
    return (
      <ReactHighstock config={this.state.config} />
    );
  }
}
