package com.crystal.ovs.models;

import com.crystal.ovs.dto.DtoTransaction;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Transaction {
    @SequenceGenerator(
            name = "transaction_sequence",
            sequenceName = "transaction_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transaction_sequence"
    )
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    private LocalDate date;
    private Double price;

    public void setFields(DtoTransaction dtoTransaction) {
        this.post = dtoTransaction.getPost();
        this.user = dtoTransaction.getUser();
        this.date = dtoTransaction.getDate();
        this.price = dtoTransaction.getPrice();
    }
}
