import { SalaryFormatPipe } from './custom-pipe.pipe';

describe('CustomPipePipe', () => {
  it('create an instance', () => {
    const pipe = new SalaryFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
