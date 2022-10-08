package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoElectricEngine;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ElectricEngine {
    @SequenceGenerator(
            name = "electric_engine_sequence",
            sequenceName = "electric_engine_sequence",
            allocationSize = 1
    )

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "electric_engine_sequence"
    )
    private Long id;
    private String type;
    private Integer batteryCapacity;
    private Integer motor_range;

    public void setFields(DtoElectricEngine dtoElectricEngine) {
        this.type = dtoElectricEngine.getType();
        this.batteryCapacity = dtoElectricEngine.getBatteryCapacity();
        this.motor_range = dtoElectricEngine.getMotor_range();
    }
}
