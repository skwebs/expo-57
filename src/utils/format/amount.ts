export function formatAmount(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatWholeAmount(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(amount);
}