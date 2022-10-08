package com.crystal.ovs.models;
import com.crystal.ovs.dto.DtoPost;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Post {
    @SequenceGenerator(
            name = "post_sequence",
            sequenceName = "post_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_sequence"
    )
    private Integer id;
    private String title;
    private String description;
    private Float price;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "post")
    private Set<Image> images;

    public void setFields(DtoPost dtoPost) {
        this.title = dtoPost.getTitle();
        this.description = dtoPost.getDescription();
        this.price = dtoPost.getPrice();
        this.car = dtoPost.getCar();
    }
}
