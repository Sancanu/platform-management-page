import { CurrencyNumberPipe } from './currency-number.pipe';

describe('CurrencyNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
