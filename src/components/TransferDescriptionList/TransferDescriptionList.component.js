import * as React from 'react';
import PropTypes from 'prop-types';
import { Label, Value, Wrapper } from './TransferDescriptionList.style';

/** * The props of TransferDescriptionList Component
 * @param {number} props.label label of the TransferDescriptionList.
 * @param {string} props.labelSymbol currency symbol of label of the TransferDescriptionList like ETH.
 * @param {string} props.value value of the key TransferDescriptionList.
 */

const TransferDescriptionList = (props) => {
  const { label, labelSymbol, value } = props;
  return (
    <Wrapper>
      <Label>
        {label} {labelSymbol}
      </Label>
      <Value>
        {value}
      </Value>
    </Wrapper>
  );
};

TransferDescriptionList.propTypes = {
  /**
   * label of the TransferDescriptionList
   */
  label: PropTypes.number.isRequired,
  /**
   * currency symbol of label of the TransferDescriptionList like ETH.
   */
  labelSymbol: PropTypes.string.isRequired,
  /**
   * value of the key TransferDescriptionList.
   */
  value: PropTypes.string.isRequired,
};

export default TransferDescriptionList;
