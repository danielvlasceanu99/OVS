package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoFuelEngine;
import com.crystal.ovs.models.types.EngineLayout;
import com.crystal.ovs.models.types.FuelType;
import com.crystal.ovs.models.types.StrokeType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table
public class FuelEngine {
    @SequenceGenerator(
            name = "fuel_engine_sequence",
            sequenceName = "fuel_engine_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "fuel_engine_sequence"
    )
    private Long id;

    private Float fuelConsumption;
    private Float co2Emissions;
    private Float displacement;
    private Integer numberOfCylinders;
    private Boolean hasTurbine;
    private Boolean hasSupercharge;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    @Enumerated(EnumType.STRING)
    private EngineLayout engineLayout;
    @Enumerated(EnumType.STRING)
    private StrokeType strokeType;


    public void setFields(DtoFuelEngine dtoFuelEngine) {
        this.fuelConsumption = dtoFuelEngine.getFuelConsumption();
        this.co2Emissions = dtoFuelEngine.getCo2Emissions();
        this.displacement = dtoFuelEngine.getDisplacement();
        this.fuelType = dtoFuelEngine.getFuelType();
        this.engineLayout = dtoFuelEngine.getEngineLayout();
        this.strokeType = dtoFuelEngine.getStrokeType();
        this.numberOfCylinders = dtoFuelEngine.getNumberOfCylinders();
        this.hasTurbine = dtoFuelEngine.getHasTurbine();
        this.hasSupercharge = dtoFuelEngine.getHasSupercharge();
    }
}
