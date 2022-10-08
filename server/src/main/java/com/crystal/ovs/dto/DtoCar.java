package com.crystal.ovs.dto;

import com.crystal.ovs.models.Engine;
import com.crystal.ovs.models.Transmission;
import com.crystal.ovs.models.types.CarType;
import com.crystal.ovs.models.types.TractionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoCar {
    private String brand;
    private String model;
    private Integer available;
    private Integer manufacturingYear;
    private CarType carType;
    private Integer engineId;
    private Engine engine;
    private Long transmissionId;
    private Transmission transmission;
    private TractionType tractionType;
    private Integer numberOfDoors;
    private String color;
}
