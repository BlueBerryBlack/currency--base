import ResultBox from './ResultBox';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [
    { amount: 100, from: 'PLN', to: 'USD', expectedOutput: 'PLN 100.00 = $28.57' },
    { amount: 20, from: 'USD', to: 'PLN', expectedOutput: '$20.00 = PLN 70' },
    { amount: 200, from: 'PLN', to: 'USD', expectedOutput: 'PLN 200.00 = $57.14' },
    { amount: 345, from: 'USD', to: 'PLN', expectedOutput: '$345.00 = PLN 1,207.50' },
  ];

  for (const { amount, from, to, expectedOutput } of testCases) {

    it(`should render proper info about conversion from ${from} to ${to}`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expectedOutput);
    });
  }

  it('should render proper info about conversion from USD to PLN', () => {
    const amount = 50;
    render(<ResultBox from="USD" to="PLN" amount={amount} />);
    const output = screen.getByTestId('output');
    const expectedOutput = `$50.00 = PLN 175`;
    expect(output).toHaveTextContent(expectedOutput);
  });

  it('should render the same currency when "from" and "to" are the same', () => {
    const amount = 123;
    const currency = 'PLN';
    render(<ResultBox from={currency} to={currency} amount={amount} />);
    const output = screen.getByTestId('output');
    const expectedOutput = `${currency} ${amount.toFixed(2)} = ${currency} ${amount.toFixed(2)}`;
    expect(output).toHaveTextContent(expectedOutput);
  });

  it('should render "Wrong value..." for negative amount', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value...');
  });

});