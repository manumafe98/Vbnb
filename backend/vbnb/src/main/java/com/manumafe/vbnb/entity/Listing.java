package com.manumafe.vbnb.entity;

import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "listings")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany(mappedBy = "listing")
    private Set<Characteristic> characteristics;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    private List<Image> images;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    private List<Reserve> reserves;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    private List<Favorite> favorites;

    @OneToOne(mappedBy = "listing")
    private Category category;

    @OneToOne(mappedBy = "listing", cascade = CascadeType.ALL)
    private Rating rating;
}
