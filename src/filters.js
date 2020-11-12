import numeral from 'numeral';
const dollarFilter = v => {
  if (!v) {
    return '$ 0';
  }
  return numeral(v).format('$ 0.00 a');
};
const percentFilter = v => {
  if (!v) {
    return '0.000%';
  }
  return numeral(v).format('0.000 %');
};

export { dollarFilter };
export { percentFilter };
