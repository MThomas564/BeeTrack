import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  const pipe = new DateFormatPipe();

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats a valid date', () => {
    const result = pipe.transform(new Date('2024-06-15'));
    expect(result).toContain('June');
    expect(result).toContain('2024');
  });

  it('returns empty string for undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('returns empty string for invalid date', () => {
    expect(pipe.transform(new Date('not-a-date'))).toBe('');
  });

  it('handles a string input coerced to Date', () => {
    const result = pipe.transform('2024-01-01' as any);
    expect(result).toContain('2024');
  });
});
