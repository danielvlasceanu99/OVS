package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoCar;
import com.crystal.ovs.models.types.CarType;
import com.crystal.ovs.models.types.TractionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car")
public class Car {
    @SequenceGenerator(
            name = "car_sequence",
            sequenceName = "car_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "car_sequence"
    )

    private Long id;
    private String brand;
    private String model;
    private Integer available;
    private Integer manufacturingYear;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "engine_id", referencedColumnName = "id")
    private Engine engine;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "transmission_id", referencedColumnName = "id")
    private Transmission transmission;

    private Integer numberOfDoors;
    private String color;
    @Enumerated(EnumType.STRING)
    private CarType carType;
    @Enumerated(EnumType.STRING)
    private TractionType tractionType;

    public void setFields(DtoCar dtoCar) {
        this.brand = dtoCar.getBrand();
        this.model = dtoCar.getModel();
        this.available = dtoCar.getAvailable();
        this.manufacturingYear = dtoCar.getManufacturingYear();
        this.carType = dtoCar.getCarType();
        this.engine = dtoCar.getEngine();
        this.transmission = dtoCar.getTransmission();
        this.tractionType = dtoCar.getTractionType();
        this.numberOfDoors = dtoCar.getNumberOfDoors();
        this.color = dtoCar.getColor();
    }
}
