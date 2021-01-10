import { CALCULATION_TYPES } from 'constants/enums';

class Paye {
  constructor(inputs = {}, taxYear){
    this.inputs = inputs;
    this.taxYear = taxYear;
    this.yearlyStdRateCutOff = parseFloat(35300);
    this.yearlyTaxCredits = parseFloat(3300);
  }

  calculate() {
    // const { frequency, taxStatus } = this.inputs;
    const period = parseFloat(this.inputs.period);
    const pay = parseFloat(this.inputs.pay);
    const yearlyStdRateCutOff = this.yearlyStdRateCutOff;
    const taxCredit = this.yearlyTaxCredits;
    const periods = parseFloat(this.inputs.periods);
    const steps = [];

    // Work out the std rate cut off for the period
    const stdRateCutOffForPeriod = parseFloat((yearlyStdRateCutOff/periods) * period).toFixed(2);
    steps.push(`Calculate std rate cut off for period: (${yearlyStdRateCutOff} / ${periods}) * ${period} = ${stdRateCutOffForPeriod}`);

    // Apply the standard rate of 20% to the income in the rate band
    const taxedAt20Percent = (pay < stdRateCutOffForPeriod) ? pay : stdRateCutOffForPeriod;

    const tax20Percent = parseFloat(taxedAt20Percent * 0.2).toFixed(2);
    steps.push(`Apply the standard rate of 20% to the income in the rate band: ${taxedAt20Percent} * 20% = ${tax20Percent}`);

    // Apply the higher rate of 40% on the balance
    const taxedAt40Percent = pay - stdRateCutOffForPeriod;

    let tax40Percent = parseFloat(taxedAt40Percent * 0.4).toFixed(2);
    let tax40PercentStep = `Apply the higher rate of 40% on the balance: (${pay} - ${stdRateCutOffForPeriod}) * 40% = ${tax40Percent}`;
    if(pay < stdRateCutOffForPeriod){
      tax40Percent = 0;
      tax40PercentStep = `Pay is less than std rate cut off for period so not applying 40% rate: 0`;
    }
    steps.push(tax40PercentStep);

    // Sum up the 20% + 40% tax
    const grossTax = parseFloat(tax20Percent) + parseFloat(tax40Percent);
    steps.push(`Gross tax: ${tax20Percent} + ${tax40Percent} = ${grossTax}`);

    // Calculate the tax credit for period
    const periodTaxCredit = ((taxCredit/periods).toFixed(2) * period).toFixed(2);
    steps.push(`Tax Credit for period: ${taxCredit} / ${periods} * ${period} = ${periodTaxCredit}`);

    // Subtract the tax credit from the gross tax to get the tax payable
    const taxPayable = (parseFloat(grossTax) - parseFloat(periodTaxCredit)).toFixed(2);
    steps.push(`Gross tax less tax credits: ${grossTax} - ${periodTaxCredit} = ${taxPayable}`);

    steps.push(`Tax payable: ${taxPayable}`);

    const results = {};
    results.type = CALCULATION_TYPES.PAYE;
    results.value = taxPayable;
    results.steps = steps;

    return results;
  }
}

export default Paye;
