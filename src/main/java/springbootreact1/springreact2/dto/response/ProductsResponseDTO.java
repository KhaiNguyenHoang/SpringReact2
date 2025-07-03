package springbootreact1.springreact2.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductsResponseDTO {
    int productID;
    String productName;
    String description;
    String category;
    double price;
    double specialPrice;
    int quantityInStock;
    String status;
    String imageUrl;
    boolean isActive;
}
