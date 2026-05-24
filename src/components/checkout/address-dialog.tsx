'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { addAddress, updateAddress } from '@/store/slices/address-slice';
import type { Address } from '@/types';
import { cn } from '@/lib/utils';

type FormState = Omit<Address, 'id'>;

const empty: FormState = {
  label: 'Home',
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  isDefault: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.label.trim()) errors.label = 'Label is required';
  if (!values.fullName.trim()) errors.fullName = 'Full name is required';
  if (!values.phone.trim()) errors.phone = 'Phone is required';
  else if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone';
  if (!values.line1.trim()) errors.line1 = 'Address line is required';
  if (!values.city.trim()) errors.city = 'City is required';
  if (!values.state.trim()) errors.state = 'State is required';
  if (!values.zip.trim()) errors.zip = 'ZIP is required';
  else if (!/^[A-Za-z0-9 -]{3,10}$/.test(values.zip.trim())) errors.zip = 'Enter a valid ZIP';
  if (!values.country.trim()) errors.country = 'Country is required';
  return errors;
}

export function AddressDialog({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Address | null;
}) {
  const dispatch = useAppDispatch();
  const isEdit = Boolean(initial);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      if (initial) {
        const { id: _id, ...rest } = initial;
        void _id;
        setValues({ ...empty, ...rest });
      } else {
        setValues(empty);
      }
      setErrors({});
      setSubmitted(false);
    }
  }, [open, initial]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (submitted) {
      setErrors(validate({ ...values, [key]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error('Please fix the highlighted fields');
      return;
    }
    if (isEdit && initial) {
      dispatch(updateAddress({ ...values, id: initial.id }));
      toast.success('Address updated');
    } else {
      dispatch(addAddress(values));
      toast.success('Address added');
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit address' : 'Add a new address'}</DialogTitle>
          <DialogDescription>
            Fields marked with <span className="text-destructive">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="addr-label">
              Label <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {['Home', 'Office', 'Other'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set('label', opt)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                    values.label === opt
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input hover:bg-accent',
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            {values.label !== 'Home' && values.label !== 'Office' && (
              <Input
                id="addr-label"
                value={values.label}
                onChange={(e) => set('label', e.target.value)}
                placeholder="Custom label"
                aria-invalid={Boolean(errors.label)}
              />
            )}
            {errors.label && <FieldError message={errors.label} />}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="addr-name"
              label="Full name"
              required
              value={values.fullName}
              onChange={(v) => set('fullName', v)}
              error={errors.fullName}
              autoComplete="name"
            />
            <Field
              id="addr-phone"
              label="Phone"
              required
              value={values.phone}
              onChange={(v) => set('phone', v)}
              error={errors.phone}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+1 (555) 010-2233"
            />
          </div>

          <Field
            id="addr-line1"
            label="Address line 1"
            required
            value={values.line1}
            onChange={(v) => set('line1', v)}
            error={errors.line1}
            autoComplete="address-line1"
            placeholder="Street address"
          />

          <Field
            id="addr-line2"
            label="Address line 2"
            value={values.line2 ?? ''}
            onChange={(v) => set('line2', v)}
            autoComplete="address-line2"
            placeholder="Apartment, suite, floor (optional)"
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              id="addr-city"
              label="City"
              required
              value={values.city}
              onChange={(v) => set('city', v)}
              error={errors.city}
              autoComplete="address-level2"
            />
            <Field
              id="addr-state"
              label="State"
              required
              value={values.state}
              onChange={(v) => set('state', v)}
              error={errors.state}
              autoComplete="address-level1"
            />
            <Field
              id="addr-zip"
              label="ZIP / Postal"
              required
              value={values.zip}
              onChange={(v) => set('zip', v)}
              error={errors.zip}
              autoComplete="postal-code"
              inputMode="text"
            />
          </div>

          <Field
            id="addr-country"
            label="Country"
            required
            value={values.country}
            onChange={(v) => set('country', v)}
            error={errors.country}
            autoComplete="country-name"
          />

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(values.isDefault)}
              onChange={(e) => set('isDefault', e.target.checked)}
              className="size-4 rounded border-input accent-primary"
            />
            Set as default shipping address
          </label>

          <DialogFooter className="mt-2 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? 'Save changes' : 'Add address'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  value,
  onChange,
  error,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return <p className="text-xs font-medium text-destructive">{message}</p>;
}
