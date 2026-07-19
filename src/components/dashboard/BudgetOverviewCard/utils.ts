export function calculateBudgetSummary(
    usedBudget: number,
    totalBudget: number,
    date = new Date(),
) {
    const remainingBudget = Math.max(totalBudget - usedBudget, 0);

    const rawUsedPercent =
        totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

    const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

    const remainingPercent =
        totalBudget > 0 ? Math.max(100 - rawUsedPercent, 0) : 0;

    const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
    ).getDate();

    const remainingDays = Math.max(
        lastDayOfMonth - date.getDate(),
        0,
    );

    const dailySafeSpend =
        remainingDays > 0
            ? remainingBudget / remainingDays
            : 0;

    return {
        remainingBudget,
        rawUsedPercent,
        progressPercent,
        remainingPercent,
        remainingDays,
        dailySafeSpend,
    };
}