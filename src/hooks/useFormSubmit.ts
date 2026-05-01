import { useState, useCallback, useRef } from 'react';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyrXsCFqEKI3jjLRJvKyXdKc-IOd5VCGcZutOPCPgjTz3NJeDeMvI-iFVEwYQBonMGhA/exec';
const RATE_LIMIT_MS = 60_000;
const lastSubmitKey = 'form_last_submit';

function getRateLimit(): number {
  try {
    return parseInt(sessionStorage.getItem(lastSubmitKey) || '0', 10);
  } catch {
    return 0;
  }
}

function setRateLimit() {
  try {
    sessionStorage.setItem(lastSubmitKey, Date.now().toString());
  } catch {}
}

function validatePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10;
}

function formatPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 10);
  let out = '';
  if (digits.length > 0) out += '(' + digits.slice(0, 3);
  if (digits.length >= 4) out += ') ' + digits.slice(3, 6);
  if (digits.length >= 7) out += '-' + digits.slice(6, 8);
  if (digits.length >= 9) out += '-' + digits.slice(8, 10);
  return out;
}

async function submitToSheet(phone: string, formId: string): Promise<void> {
  const payload = {
    formId,
    page: window.location.pathname,
    phone,
  };

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  });
}

export function useFormSubmit(formId = 'contact_section') {
  const [phone, setPhoneRaw] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneRaw(formatPhone(e.target.value));
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypotRef.current?.value) return;

    const last = getRateLimit();
    if (Date.now() - last < RATE_LIMIT_MS) {
      setError('Подождите минуту перед следующей отправкой');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      await submitToSheet(phone, formId);
      setRateLimit();
      setStatus('success');
      setPhoneRaw('');
    } catch {
      setStatus('error');
      setError('Что-то пошло не так. Попробуйте позже.');
    }
  }, [phone, formId]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError('');
    setPhoneRaw('');
  }, []);

  return {
    phone,
    status,
    error,
    honeypotRef,
    handlePhoneChange,
    handleSubmit,
    reset,
  };
}
