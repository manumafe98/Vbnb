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
public class FavoriteId implements Serializable {
    
    private Long userId;
    private Long listingId;
}
