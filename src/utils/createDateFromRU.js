export default function createDateFromRU(dateString) {
    const [day, month, year] = dateString.split('-');
    const finalDate = new Date(year, month - 1, day);
    return finalDate;
}
