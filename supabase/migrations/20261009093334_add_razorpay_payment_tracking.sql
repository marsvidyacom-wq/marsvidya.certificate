alter table public.registration_leads
  add column amount_paise integer,
  add column currency text,
  add column razorpay_order_id text,
  add column razorpay_payment_id text,
  add column payment_status text,
  add column paid_at timestamptz;

alter table public.registration_leads
  add constraint registration_leads_amount_positive
    check (amount_paise is null or amount_paise > 0),
  add constraint registration_leads_currency_format
    check (currency is null or currency ~ '^[A-Z]{3}$'),
  add constraint registration_leads_payment_status_valid
    check (payment_status is null or payment_status in ('created', 'captured', 'failed', 'refunded')),
  add constraint registration_leads_payment_order_complete
    check (
      razorpay_order_id is null
      or (amount_paise is not null and currency is not null and payment_status is not null)
    ),
  add constraint registration_leads_captured_has_paid_at
    check (payment_status <> 'captured' or paid_at is not null),
  add constraint registration_leads_razorpay_order_id_key unique (razorpay_order_id),
  add constraint registration_leads_razorpay_payment_id_key unique (razorpay_payment_id);
