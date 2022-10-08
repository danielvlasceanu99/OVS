import { Pipe, PipeTransform } from "@angular/core";
import { FuelEngine } from "src/app/models/fuel-engine.model";

@Pipe({
    name: "fuelEngineToString",
})
export class FuelEngineToStringPipe implements PipeTransform {
    transform(fuelEngine: FuelEngine): string {
        console.log("engine to string");
        let fuelEngineString: string = "It does not have one";

        if (fuelEngine != null) {
            fuelEngineString = `ICE ${fuelEngine?.fuelConsumption} L/100KM 
            ${fuelEngine?.engineLayout}${fuelEngine?.numberOfCylinders} `;
        }
        return fuelEngineString;
    }
}
