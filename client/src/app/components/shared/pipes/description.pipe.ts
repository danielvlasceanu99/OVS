import { Pipe, PipeTransform } from "@angular/core";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: "descriptionPipe" })
export class DescriptionPipe implements PipeTransform {
    transform(value: string, length = 75): string {
        return value.length > length ? value.substring(0, length) + "..." : value;
    }
}
