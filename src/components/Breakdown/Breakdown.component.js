import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryContainer, VictoryTooltip } from 'victory';
import SectionHeading from 'components/ui/SectionHeading';
import Heading from 'components/ui/Heading';
import { Title, Wrapper } from './Breakdown.style';
import Tokens from './Tokens';
import { formatFiat } from '../../utils/numberFormats';

/**
 * This component shows user's total coins' convertion in dollar and a relative chart.
 */
const Breakdown = ({ data = [], value }) => {
  const chartData = data.map((item) => ({
    x: item.percentage,
    y: 2 * item.percentage,
    label: `${item.label}: ${item.percentage}%`,
  }));
  const colors = data.map((item) => item.color);
  const labels = data.map((item) => ({
    label: item.label,
    percentage: item.percentage,
  }));
  if (chartData.length === 0) {
    return <div />;
  }
  return (
    <Wrapper>
      <SectionHeading>Balance breakdown</SectionHeading>
      {(
        <div>
          <Title>Total fiat value</Title>
          <Heading large>{formatFiat(value, 'USD')}</Heading>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <VictoryPie
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ stroke: 'transparent', fill: 'rgba(0,0,0,0.5)' }}
              style={{ fill: 'white' }}
              width={90}
            />
          }
          innerRadius={90}
          colorScale={colors}
          data={chartData}
          containerComponent={
            <VictoryContainer
              responsive
              style={{ marginTop: '-2.5rem', width: '65%', paddingBottom: '1rem' }}
            />
          }
        />
      </div>
      {
        value !== '0' &&
          <div>
            <SectionHeading>Assets</SectionHeading>
            <Tokens data={labels} />
          </div>
      }
    </Wrapper>
  );
};

Breakdown.propTypes = {
  /**
   * Total  value in dollars.
   */
  value: PropTypes.string.isRequired,
  /**
   * data  to populate  the Breakdowwn Component.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      percentage: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
export default Breakdown;
