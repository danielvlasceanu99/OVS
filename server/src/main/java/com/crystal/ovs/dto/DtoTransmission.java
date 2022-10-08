package com.crystal.ovs.dto;
import com.crystal.ovs.models.types.TransmissionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoTransmission {
    private TransmissionType transmissionType;
    private Integer numberOfGears;
}
