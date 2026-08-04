export type PaymentStatus = "paid" | "partial" | "due";

export type CardNetwork =
  "Visa" | "Mastercard" | "RuPay" | "Amex" | "Diners Club";

export interface CreditCard {
  id: string;

  // Card Details
  bankName: string;
  cardName: string;
  last4: string;
  network: CardNetwork;

  // Billing Cycle
  billingCycleStart: string;
  billingCycleEnd: string;

  // Statement
  statementDate: string;
  statementInDays: number;

  // Current Billing Cycle
  currentCycleSpend: number;

  // Previous Statement
  previousStatementAmount: number;
  remainingDueAmount: number;
  dueDate: string;

  // Payment
  paymentStatus: PaymentStatus;
  lastPaymentAmount: number;
  lastPaymentDate: string | null;
}
