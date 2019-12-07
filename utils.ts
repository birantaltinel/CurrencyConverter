export function isNotAValidDate(date: Date) {
    return isNaN(date.getTime());
}