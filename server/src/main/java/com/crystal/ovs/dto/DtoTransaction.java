package com.crystal.ovs.dto;
import com.crystal.ovs.models.AppUser;
import com.crystal.ovs.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoTransaction {
    private Integer PostId;
    private Post post;
    private Long UserId;
    private AppUser user;
    private LocalDate date;
    private Double price;
}
