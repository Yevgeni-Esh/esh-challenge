export function yearsAgo(dateTimeString: string): string {
    const inputDate = new Date(dateTimeString);
    if (isNaN(inputDate.getTime())) {
        return '';
    }
    const currentDate = new Date();
    let yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();
    
    // Adjust if the current date is before the input date in the current year
    if (currentDate.getMonth() < inputDate.getMonth() || 
        (currentDate.getMonth() === inputDate.getMonth() && currentDate.getDate() < inputDate.getDate())) {
        yearsDifference = yearsDifference - 1;
    }
    
    return `${yearsDifference} Years Ago`;
}