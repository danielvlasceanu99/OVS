import { Pipe, PipeTransform } from '@angular/core';
import { Transmission } from 'src/app/models/transmission.model';

@Pipe({
  name: 'transmissionToString'
})
export class TransmissionToStringPipe implements PipeTransform {

  transform(transmission: Transmission): string {
     let transmissionString: string = `Type: ${transmission.transmissionType} Gears: ${transmission.numberOfGears}`;

     return transmissionString;
  }

}
