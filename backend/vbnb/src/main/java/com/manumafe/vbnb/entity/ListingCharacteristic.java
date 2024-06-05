package com.manumafe.vbnb.entity;

import java.io.Serializable;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "listing_characteristics")
public class ListingCharacteristic implements Serializable{
    
    @EmbeddedId
    private ListingCharacteristicsId id;

    @ManyToOne
    @MapsId("listingId")
    @JoinColumn(name = "listing_id")
    private Listing listing;

    @ManyToOne
    @MapsId("characteristicId")
    @JoinColumn(name = "characteristic_id")
    private Characteristic characteristic;
}
