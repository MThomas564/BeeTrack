import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | undefined): string {
    // Convert string to Date if the input is a string
    const date = typeof value === 'string' ? new Date(value) : value;

    // Check if the date is valid
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';

   // Create options for the formatter
   const weekdayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'long' });
   const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long' });
   const yearFormatter = new Intl.DateTimeFormat('en-GB', { year: 'numeric' });

   // Format parts separately
   const dayName = weekdayFormatter.format(date);
   const monthName = monthFormatter.format(date);
   const year = yearFormatter.format(date);

   // Construct the formatted date string
   return `${dayName}, ${monthName} ${year}`;
 }

}