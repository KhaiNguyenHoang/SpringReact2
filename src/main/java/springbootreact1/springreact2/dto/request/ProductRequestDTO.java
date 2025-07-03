package springbootreact1.springreact2.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequestDTO {
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
