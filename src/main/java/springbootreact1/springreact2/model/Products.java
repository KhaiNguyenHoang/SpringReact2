package springbootreact1.springreact2.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "Products")
public class Products implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ProductID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;

    @Column(name = "ProductName", nullable = false)
    private String productName;

    @Column(name = "Description")
    private String description;

    @Column(name = "Category")
    private String category;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @Column(name = "SpecialPrice")
    private BigDecimal specialPrice;

    @Column(name = "QuantityInStock")
    private Integer quantityInStock;

    @Column(name = "Status")
    private String status;

    @Column(name = "ImageUrl")
    private String imageUrl;

    @Column(name = "IsActive")
    private Boolean isActive;

    @Column(name = "IsFeatured")
    private Boolean isFeatured;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "UpdatedAt")
    private Date updatedAt;

}
