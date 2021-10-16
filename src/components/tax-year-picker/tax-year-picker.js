import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { taxYearSelector, updateTaxYear } from 'slices/tax-year';

import { irishTaxYears, ukTaxYears } from 'constants/tax-years';
import { COUNTRIES } from 'constants/enums';

import './style.scss';

const TaxYearPicker = ({
  onChange,
  country
}) => {
  const dispatch = useDispatch();
  const taxYear = useSelector(taxYearSelector);

  const selected = taxYear || String(new Date().getFullYear());
  const [selectedValue, setSelectedValue] = useState(selected);

  const selectValue = (e) => {
    const value = e.currentTarget.value;
    setSelectedValue(value);
    dispatch(updateTaxYear(value))
    onChange(e);
  }

  let years = irishTaxYears;
  if(country === COUNTRIES.UK){
    years = ukTaxYears;
  }

  const buttonsList = years.map((year) => {
    return (
      <ToggleButton
        key={`tax_year_${year.id}`}
        name='taxYear'
        type='radio'
        variant='info'
        checked={year.name === selectedValue}
        value={year.name}
        onChange={selectValue}
      >
        {year.name}
      </ToggleButton>
    )
  });

  return (
    <div className='tax-year-pickers'>
      <ButtonGroup toggle>
        {buttonsList}
      </ButtonGroup>
    </div>
  );
};

TaxYearPicker.propTypes = {
  onChange: PropTypes.func,
  country: PropTypes.string
}

TaxYearPicker.defaultProps = {
  country: COUNTRIES.IE
}

export default TaxYearPicker;
