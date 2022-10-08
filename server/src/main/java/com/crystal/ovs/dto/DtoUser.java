package com.crystal.ovs.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoUser {

    private String email;
    private String password;

    private Boolean locked = false;
    private Boolean enabled = true;
}
