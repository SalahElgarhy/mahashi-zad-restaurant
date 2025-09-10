export const sanitizeString = (value) => {
  if (typeof value !== 'string') return '';
  let sanitized = value.replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/javascript:/gi, '').replace(/data:/gi, '');
  sanitized = sanitized.replace(/\s{2,}/g, ' ').trim();
  return sanitized;
};

// Looser sanitizer for live input: preserves user spaces and trailing space while typing
export const sanitizeInputLoose = (value) => {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '').replace(/data:/gi, '');
};

export const hardenExternalLinks = () => {
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute('rel') || '').split(/\s+/);
    if (!rel.includes('noopener')) rel.push('noopener');
    if (!rel.includes('noreferrer')) rel.push('noreferrer');
    a.setAttribute('rel', rel.filter(Boolean).join(' '));
  });
};

export const normalizePhoneEgypt = (local) => {
  const digits = String(local || '').replace(/[^\d]/g, '');
  const withoutZero = digits.startsWith('0') ? digits.slice(1) : digits;
  return `+20${withoutZero}`;
};

export const validatePhoneEgypt = (local) => {
  const digits = String(local || '').replace(/[^\d]/g, '');
  return /^1\d{9}$/.test(digits) || /^01\d{9}$/.test(digits);
};


