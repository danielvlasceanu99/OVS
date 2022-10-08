package com.crystal.ovs.dto;

import com.crystal.ovs.models.types.EngineLayout;
import com.crystal.ovs.models.types.FuelType;
import com.crystal.ovs.models.types.StrokeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoFuelEngine {
    private Float fuelConsumption;
    private Float co2Emissions;
    private Float displacement;
    private FuelType fuelType;
    private EngineLayout engineLayout;
    private StrokeType strokeType;
    private Integer numberOfCylinders;
    private Boolean hasTurbine;
    private Boolean hasSupercharge;
}