package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoEngine;
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
public class Engine {
    @SequenceGenerator(
            name = "engine_sequence",
            sequenceName = "engine_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "engine_sequence"
    )
    private Integer id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "electric_engine_id", referencedColumnName = "id")
    private ElectricEngine electricEngine;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "fuel_engine_id", referencedColumnName = "id")
    private FuelEngine fuelEngine;

    private Integer horsePower;
    private Integer torque;

    public void setFields(DtoEngine dtoEngine) {
        this.fuelEngine = dtoEngine.getFuelEngine();
        this.electricEngine = dtoEngine.getElectricEngine();
        this.horsePower = dtoEngine.getHorsePower();
        this.torque = dtoEngine.getTorque();
    }
}
