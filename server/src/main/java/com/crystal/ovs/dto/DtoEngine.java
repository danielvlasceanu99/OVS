package com.crystal.ovs.dto;

import com.crystal.ovs.models.ElectricEngine;
import com.crystal.ovs.models.FuelEngine;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoEngine {
    private Long fuelEngineId;
    private FuelEngine fuelEngine;
    private Long electricEngineId;
    private ElectricEngine electricEngine;
    private Integer horsePower;
    private Integer torque;
}
