export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return year;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return dateStr;
  return `${months[monthIndex]} ${year}`;
}

export function formatDateRange(start: string, end: string, current: boolean): string {
  const startStr = formatDate(start);
  const endStr = current ? 'Present' : formatDate(end);
  return startStr && endStr ? `${startStr} — ${endStr}` : startStr || endStr || '';
}

export function getHostname(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '') + (urlObj.pathname !== '/' ? urlObj.pathname : '');
  } catch {
    return url;
  }
}

export function sanitizeFilename(name: string): string {
  return name.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || 'resume';
}
