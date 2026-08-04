import type { AccountItem } from "./types";

export const accountItems: AccountItem[] = [
  {
    id: "credit-cards",
    name: "Credit Cards",
    amount: 20_000.21,
    balanceType: "liability",
    icon: "card-outline",
    navigateTo: "/credit-cards",
  },
  {
    id: "banks",
    name: "Banks",
    amount: 100_000,
    balanceType: "asset",
    icon: "business-outline",
    navigateTo: "/banks",
  },
  {
    id: "cash",
    name: "Cash",
    amount: 20_000,
    balanceType: "asset",
    icon: "cash-outline",
    navigateTo: "/cash",
  },
  {
    id: "payable",
    name: "Payable",
    amount: 20_000,
    balanceType: "liability",
    icon: "arrow-up-circle-outline",
    navigateTo: "/payable",
  },
  {
    id: "receivable",
    name: "Receivable",
    amount: 20_000,
    balanceType: "receivable",
    icon: "arrow-down-circle-outline",
    navigateTo: "/receivable",
  },
];

// const accountItems = [
//   {
//     id: "credit-cards",
//     name: "Credit Cards",
//     amount: 20_000.21,
//     balanceType: "liability",
//     icon: "card-outline",
//   },
//   {
//     id: "banks",
//     name: "Banks",
//     amount: 100_000,
//     balanceType: "asset",
//     icon: "business-outline",
//   },
//   {
//     id: "cash",
//     name: "Cash",
//     amount: 20_000,
//     balanceType: "asset",
//     icon: "cash-outline",
//   },
//   {
//     id: "payable",
//     name: "Payable",
//     amount: 20_000,
//     balanceType: "liability",
//     icon: "arrow-up-circle-outline",
//   },
//   {
//     id: "receivable",
//     name: "Receivable",
//     amount: 20_000,
//     balanceType: "receivable",
//     icon: "arrow-down-circle-outline",
//   },
// ] as const;
