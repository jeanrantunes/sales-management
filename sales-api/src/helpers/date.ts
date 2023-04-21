export const isDateValid = (date: Date): Boolean => {
    return date instanceof Date && !isNaN(Number(date));
}