export function calculateScore(timeUsed: number, maxTime: number, maxPoints: number): number {
    const timePercentage = (timeUsed / maxTime) * 100

    if (timePercentage < 50) {
        return maxPoints // 100% of points
    } else if (timePercentage < 75) {
        return Math.round(maxPoints * 0.5) // 50% of points
    } else if (timePercentage < 100) {
        return Math.round(maxPoints * 0.25) // 25% of points
    } else {
        return 0 // 0% of points
    }
}

export function getTimeMultiplier(timeUsed: number, maxTime: number): string {
    const timePercentage = (timeUsed / maxTime) * 100

    if (timePercentage < 50) {
        return "100%"
    } else if (timePercentage < 75) {
        return "50%"
    } else if (timePercentage < 100) {
        return "25%"
    } else {
        return "0%"
    }
}
