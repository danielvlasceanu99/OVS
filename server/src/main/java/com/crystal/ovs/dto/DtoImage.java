package com.crystal.ovs.dto;

import com.crystal.ovs.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoImage {
    private String imageUrl;
    private Integer PostId;
    private Post post;
}
