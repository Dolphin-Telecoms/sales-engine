// lib/db.ts

type Payment = {
  transaction_id: string;
  status: "pending" | "completed" | "failed";
};

const payments = new Map<string, Payment>();

export async function createPayment(transaction_id: string) {
  payments.set(transaction_id, {
    transaction_id,
    status: "pending",
  });
}

export async function updatePaymentStatus(
  transaction_id: string,
  status: Payment["status"]
) {
  const payment = payments.get(transaction_id);

  if (payment) {
    payment.status = status;
    payments.set(transaction_id, payment);
  }
}

export async function getPayment(transaction_id: string) {
  return payments.get(transaction_id);
}