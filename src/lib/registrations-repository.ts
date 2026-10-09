import type { RegistrationInput } from "@/lib/registration";
import type { RazorpayOrder } from "@/lib/registration-handler";
import { sql } from "@/lib/database";

export async function insertRegistration({
  registration,
  order,
}: {
  registration: RegistrationInput;
  order: RazorpayOrder;
}): Promise<void> {
  await sql`
    insert into public.registration_leads (
      name,
      email,
      phone,
      profession,
      amount_paise,
      currency,
      razorpay_order_id,
      payment_status
    )
    values (
      ${registration.name},
      ${registration.email},
      ${registration.phone},
      ${registration.profession},
      ${order.amount},
      ${order.currency},
      ${order.id},
      'created'
    )
  `;
}

export async function findRegistrationOrder(orderId: string): Promise<{
  orderId: string;
  amount: number;
  currency: string;
} | null> {
  const rows = await sql<
    Array<{ razorpay_order_id: string; amount_paise: number; currency: string }>
  >`
    select razorpay_order_id, amount_paise, currency
    from public.registration_leads
    where razorpay_order_id = ${orderId}
    limit 1
  `;

  const row = rows[0];
  return row
    ? { orderId: row.razorpay_order_id, amount: row.amount_paise, currency: row.currency }
    : null;
}

export async function markRegistrationPaid({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId: string;
}): Promise<void> {
  await sql`
    update public.registration_leads
    set
      razorpay_payment_id = ${paymentId},
      payment_status = 'captured',
      paid_at = coalesce(paid_at, now())
    where razorpay_order_id = ${orderId}
  `;
}

export async function markRegistrationFailed({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId: string;
}): Promise<void> {
  await sql`
    update public.registration_leads
    set
      razorpay_payment_id = ${paymentId},
      payment_status = 'failed'
    where razorpay_order_id = ${orderId}
      and payment_status <> 'captured'
  `;
}
