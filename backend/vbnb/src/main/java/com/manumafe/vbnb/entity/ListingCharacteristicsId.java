package com.manumafe.vbnb.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingCharacteristicsId implements Serializable {
    
    private Long listingId;
    private Long characteristicId;
}
