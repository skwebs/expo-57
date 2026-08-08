import type { CreditCard } from "./types";

export const creditCards: CreditCard[] = [
  {
    id: "hdfc-millennia",
    bankName: "HDFC Bank",
    cardName: "Millennia",
    last4: "2458",
    network: "Visa",

    billingCycleStart: "2026-07-06",
    billingCycleEnd: "2026-08-05",

    statementDate: "2026-08-05",
    statementInDays: 17,

    currentCycleSpend: 12840,

    previousStatementAmount: 18540,
    remainingDueAmount: 8540,

    dueDate: "2026-08-23",

    paymentStatus: "partial",

    lastPaymentAmount: 10000,
    lastPaymentDate: "2026-07-14",
  },

  {
    id: "sbi-simplyclick",
    bankName: "SBI Card",
    cardName: "SimplyCLICK",
    last4: "6134",
    network: "Visa",

    billingCycleStart: "2026-07-16",
    billingCycleEnd: "2026-08-15",

    statementDate: "2026-08-15",
    statementInDays: 27,

    currentCycleSpend: 4250,

    previousStatementAmount: 9250,
    remainingDueAmount: 0,

    dueDate: "2026-09-02",

    paymentStatus: "paid",

    lastPaymentAmount: 9250,
    lastPaymentDate: "2026-07-18",
  },

  {
    id: "icici-amazon-pay",
    bankName: "ICICI Bank",
    cardName: "Amazon Pay",
    last4: "9018",
    network: "Visa",

    billingCycleStart: "2026-07-11",
    billingCycleEnd: "2026-08-10",

    statementDate: "2026-08-10",
    statementInDays: 22,

    currentCycleSpend: 23480,

    previousStatementAmount: 24320,
    remainingDueAmount: 24320,

    dueDate: "2026-08-28",

    paymentStatus: "due",

    lastPaymentAmount: 0,
    lastPaymentDate: null,
  },

  {
    id: "axis-ace",
    bankName: "Axis Bank",
    cardName: "ACE",
    last4: "5520",
    network: "Mastercard",

    billingCycleStart: "2026-07-01",
    billingCycleEnd: "2026-07-31",

    statementDate: "2026-07-31",
    statementInDays: 12,

    currentCycleSpend: 7650,

    previousStatementAmount: 11890,
    remainingDueAmount: 3890,

    dueDate: "2026-08-18",

    paymentStatus: "partial",

    lastPaymentAmount: 8000,
    lastPaymentDate: "2026-07-17",
  },

  {
    id: "idfc-wow",
    bankName: "IDFC FIRST Bank",
    cardName: "WOW!",
    last4: "1882",
    network: "RuPay",

    billingCycleStart: "2026-07-09",
    billingCycleEnd: "2026-08-08",

    statementDate: "2026-08-08",
    statementInDays: 20,

    currentCycleSpend: 1420,

    previousStatementAmount: 0,
    remainingDueAmount: 0,

    dueDate: "2026-08-26",

    paymentStatus: "paid",

    lastPaymentAmount: 0,
    lastPaymentDate: null,
  },
];
