package com.crystal.ovs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoElectricEngine {
    private String type;
    private Integer batteryCapacity;
    private Integer motor_range;
}
