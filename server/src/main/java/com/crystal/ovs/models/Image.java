package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoImage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table
public class Image {
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    private Integer id;
    private String imageUrl;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    //@JsonIgnore
    private Post post;

    public void setFields(DtoImage dtoImage) {
        this.imageUrl = dtoImage.getImageUrl();
        this.post = dtoImage.getPost();
    }

}
