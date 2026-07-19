import Ionicons from "@react-native-vector-icons/ionicons";

export type AccountBalanceType =
    | "asset"
    | "liability"
    | "receivable";

export type AccountItem = {
    id: string;
    name: string;
    amount: number;
    balanceType: AccountBalanceType;
    icon: React.ComponentProps<typeof Ionicons>["name"];
};