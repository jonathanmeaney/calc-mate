import { CALCULATION_TYPES } from 'constants/enums';
import { frequencyMaxPeriodMap } from 'constants/frequencies';

class Usc2017 {
  constructor(inputs = {}){
    this.inputs = inputs;
    this.taxYear = '2017';
    this.rateBands = {
      lower: {
        percentage: parseFloat(0.5),
        threshold: parseFloat(12012)
      },
      middle: {
        percentage: parseFloat(2.5),
        threshold: parseFloat(6760)
      },
      upper: {
        percentage: parseFloat(5),
        threshold: parseFloat(51272)
      },
      balancePercentage: parseFloat(8),
      exemptionLimit: parseFloat(13000)
    }
  }

  calculate() {
    const round = (value) => {
      const n = Number((Math.abs(value) * 100).toPrecision(15));
      return Math.round(n) / 100 * Math.sign(value);
    }

    const pay = parseFloat(this.inputs.pay) || parseFloat('0.00');
    const periods = frequencyMaxPeriodMap[String(this.inputs.frequency)] || frequencyMaxPeriodMap['1'];
    // const periods = 1;
    const payForPeriod = round(pay/periods);

    const {
      lower: lowerRateBand,
      middle: middleRateBand,
      upper: upperRateBand,
      balancePercentage,
      exemptionLimit
    } = this.rateBands;

    let uscPayable = 0;
    let uscPayablePerPeriod = 0.00;
    const steps = [];

    const lowerThreshold = lowerRateBand.threshold;
    const middleThreshold = middleRateBand.threshold;
    const upperThreshold = upperRateBand.threshold;

    const lowerThresholdMax = lowerThreshold;
    const middleThresholdMax = (lowerThresholdMax + middleThreshold);
    const upperThresholdMax = (middleThresholdMax + upperThreshold);
    // console.log('lowerThresholdMax',lowerThresholdMax)
    // console.log('middleThresholdMax',middleThresholdMax)
    // console.log('upperThresholdMax',upperThresholdMax)
    // console.log('payForPeriod',payForPeriod)
    // console.log('exemptionLimit',exemptionLimit)

    if(pay >= exemptionLimit){
      let uscableAmount = 0;
      // Calculate the USC for lower threshold
      const lowerUscValue = round(lowerThresholdMax * (lowerRateBand.percentage / 100));
      // console.log('lower USC', lowerUscValue);
      uscPayable += lowerUscValue;
      steps.push(`Calculate USC on lower threshold: ${lowerThresholdMax} X ${lowerRateBand.percentage}% = ${lowerUscValue.toFixed(2)}`);

      // Calculate the USC for middle threshold
      let middleUscValue = 0;
      uscableAmount = 0;
      if(pay > middleThresholdMax){
        uscableAmount = middleThresholdMax - lowerThresholdMax;
      }else if(pay > lowerThresholdMax && pay <= middleThresholdMax){
        uscableAmount = pay - lowerThresholdMax;
      }
      uscableAmount = round(uscableAmount);
      // console.log('middle uscableAmount', uscableAmount);
      middleUscValue = round(uscableAmount * (middleRateBand.percentage / 100));
      uscPayable += middleUscValue;
      // console.log('middle USC', middleUscValue);
      steps.push(`Calculate USC on middle threshold: ${uscableAmount} X ${middleRateBand.percentage}% = ${middleUscValue.toFixed(2)}`);

      // Calculate the USC for upper threshold
      let upperUscValue = 0;
      uscableAmount = 0;
      if(pay > middleThresholdMax && pay <= upperThresholdMax){
        uscableAmount = pay - middleThresholdMax;
      }
      uscableAmount = round(uscableAmount);
      // console.log('upper uscableAmount', uscableAmount);
      upperUscValue = round(uscableAmount * (upperRateBand.percentage / 100));
      uscPayable += upperUscValue;
      // console.log('upper USC', upperUscValue);
      steps.push(`Calculate USC on upper threshold: ${uscableAmount} X ${upperRateBand.percentage}% = ${upperUscValue.toFixed(2)}`);

      // Calculate the USC on the balance
      let balanceUscValue = 0;
      uscableAmount = 0;
      if(payForPeriod > upperThresholdMax){
        uscableAmount = payForPeriod - upperThresholdMax;
        // console.log('balance uscableAmount', uscableAmount);
        balanceUscValue = round(uscableAmount * (balancePercentage / 100));
        console.log('balanceUscValue',balanceUscValue)
        uscPayable += balanceUscValue;
        console.log('uscPayable',uscPayable)
      }
      uscableAmount = round(uscableAmount);
      steps.push(`Calculate USC on balance: ${uscableAmount} X ${balancePercentage}% = ${balanceUscValue.toFixed(2)}`);

      uscPayablePerPeriod = round(uscPayable/periods);
    } else {
      steps.push(`USC not applicable for salary`);
    }
    uscPayable = round(uscPayable);

    // console.log('uscPayable',uscPayable);
    steps.push(`USC payable total: ${uscPayable.toFixed(2)}`);
    steps.push(`USC payable per period: ${uscPayable.toFixed(2)} / ${periods} = ${uscPayablePerPeriod.toFixed(2)}`);

    const results = {};
    results.type = CALCULATION_TYPES.USC;
    results.value = {
      total: uscPayable,
      perPeriod: uscPayablePerPeriod
    };
    results.steps = steps;

    return results;
  }
}

export default Usc2017;
