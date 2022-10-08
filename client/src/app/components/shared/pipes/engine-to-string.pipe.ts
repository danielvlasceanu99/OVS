import { Pipe, PipeTransform } from "@angular/core";
import { Engine } from "src/app/models/engine.model";

@Pipe({
    name: "engineToString",
})
export class EngineToStringPipe implements PipeTransform {
    transform(engine: Engine): string {
        console.log("engine to string");
        let engineString: string = "";
        engineString += `(${engine.id}) ${engine.horsePower}HP ${engine.torque}Nm`;

        if (engine.electricEngine && engine.fuelEngine) {
            engineString += ` Hibrid ${engine.electricEngine.motor_range} KM ${engine.fuelEngine.fuelConsumption} L/100KM 
            ${engine.fuelEngine.engineLayout}${engine.fuelEngine.numberOfCylinders}`;
        } else if (engine.electricEngine) {
            engineString += ` Electric ${engine.electricEngine.motor_range} KM ${engine.electricEngine.type}`;
        } else {
            engineString += ` ICE ${engine.fuelEngine?.fuelConsumption} L/100KM 
            ${engine.fuelEngine?.engineLayout}${engine.fuelEngine?.numberOfCylinders} `;
        }

        return engineString;
    }
}
