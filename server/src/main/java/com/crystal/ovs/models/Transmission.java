package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoTransmission;
import com.crystal.ovs.models.types.TransmissionType;
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
public class Transmission {
    @SequenceGenerator(
            name = "transmission_sequence",
            sequenceName = "transmission_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transmission_sequence"
    )
    private Long id;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
    private Integer numberOfGears;

    public void setFields(DtoTransmission dtoTransmission) {
        this.transmissionType = dtoTransmission.getTransmissionType();
        this.numberOfGears = dtoTransmission.getNumberOfGears();
    }
}
