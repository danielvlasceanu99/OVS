import { Pipe, PipeTransform } from "@angular/core";
import { ElectricEngine } from "src/app/models/electric-engine.model";

@Pipe({
    name: "electricEngineToString",
})
export class ElectricEngineToStringPipe implements PipeTransform {
    transform(electricEngine: ElectricEngine): string {
        let engineString: string = "";
        engineString += "It does not have one";

        if (electricEngine != null) {
            engineString = ` Electric ${electricEngine.motor_range} KM ${electricEngine.type}`;
        }

        return engineString;
    }
}
