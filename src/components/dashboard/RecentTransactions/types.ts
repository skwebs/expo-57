import { Ionicons } from "@react-native-vector-icons/ionicons";

export type TransactionType =
    | "expense"
    | "income"
    | "transfer"
    | "payment"
    | "refund";

export type RecentTransaction = {
    id: string;
    title: string;
    category: string;
    accountName: string;
    amount: number;
    type: TransactionType;
    date: Date;
    icon: React.ComponentProps<typeof Ionicons>["name"];
};