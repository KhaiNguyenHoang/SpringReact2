package springbootreact1.springreact2.service;

import org.springframework.stereotype.Service;
import springbootreact1.springreact2.dto.request.ProductRequestDTO;
import springbootreact1.springreact2.dto.response.ProductsResponseDTO;
import springbootreact1.springreact2.model.Products;
import springbootreact1.springreact2.repository.ProductsRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

    private final ProductsRepository productsRepository;

    public ProductService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public List<ProductsResponseDTO> getAllProducts() {
        try {
            List<Products> products = productsRepository.findAll();
            List<ProductsResponseDTO> dtoList = new java.util.ArrayList<>();

            for (Products product : products) {
                ProductsResponseDTO dto = new ProductsResponseDTO();
                dto.setProductID(product.getProductID());
                dto.setProductName(product.getProductName());
                dto.setDescription(product.getDescription());
                dto.setCategory(product.getCategory());
                dto.setPrice(product.getPrice().doubleValue());

                if (product.getSpecialPrice() != null) {
                    dto.setSpecialPrice(product.getSpecialPrice().doubleValue());
                }

                if (product.getQuantityInStock() != null) {
                    dto.setQuantityInStock(product.getQuantityInStock());
                }

                dto.setStatus(product.getStatus());
                dto.setImageUrl(product.getImageUrl());

                dto.setActive(product.getIsActive() != null ? product.getIsActive() : false);

                dtoList.add(dto);
            }

            return dtoList;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean addProduct(ProductRequestDTO productRequestDTO) {
        try {
            // Input validation
            if (productRequestDTO == null) {
                throw new IllegalArgumentException("Product request cannot be null");
            }

            if (productRequestDTO.getProductName() == null || productRequestDTO.getProductName().trim().isEmpty()) {
                throw new IllegalArgumentException("Product name is required");
            }

            if (productRequestDTO.getPrice() < 0) {
                throw new IllegalArgumentException("Price cannot be negative");
            }

            Products product = Products.builder()
                    .productName(productRequestDTO.getProductName())
                    .description(productRequestDTO.getDescription())
                    .category(productRequestDTO.getCategory())
                    .price(BigDecimal.valueOf(productRequestDTO.getPrice())) // Fixed casting issue
                    .specialPrice(productRequestDTO.getSpecialPrice() > 0 ?
                            BigDecimal.valueOf(productRequestDTO.getSpecialPrice()) : null) // Fixed null check
                    .quantityInStock(productRequestDTO.getQuantityInStock())
                    .status(productRequestDTO.getStatus())
                    .imageUrl(productRequestDTO.getImageUrl())
                    .isActive(productRequestDTO.isActive()) // Removed unnecessary null check for primitive boolean
                    .build();

            productsRepository.save(product);
            return true;
        } catch (Exception e) {
            // Log the error appropriately
            throw new RuntimeException("Failed to add product: " + e.getMessage(), e);
        }
    }
}
