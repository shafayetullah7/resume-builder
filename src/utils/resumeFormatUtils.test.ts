import { describe, it, expect } from 'vitest';
import { formatDate, formatDateRange, getHostname } from './resumeFormatUtils';

describe('resumeFormatUtils', () => {
  it('formats YYYY-MM dates', () => {
    expect(formatDate('2021-01')).toBe('Jan 2021');
    expect(formatDate('2018-12')).toBe('Dec 2018');
  });

  it('passes through free-text dates', () => {
    expect(formatDate('Jan 2021')).toBe('Jan 2021');
  });

  it('formats date ranges', () => {
    expect(formatDateRange('2021-01', '2022-06', false)).toBe('Jan 2021 — Jun 2022');
    expect(formatDateRange('2021-01', '', true)).toBe('Jan 2021 — Present');
  });

  it('strips www from hostnames', () => {
    expect(getHostname('https://www.github.com/user')).toBe('github.com/user');
    expect(getHostname('github.com')).toBe('github.com');
  });
});
