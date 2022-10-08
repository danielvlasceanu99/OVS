package com.crystal.ovs.dto;
import com.crystal.ovs.models.Car;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoPost {
    private String title;
    private String description;
    private Float price;
    private Long CarId;
    private Car car;
}
