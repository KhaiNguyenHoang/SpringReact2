package springbootreact1.springreact2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import springbootreact1.springreact2.dto.request.ProductRequestDTO;
import springbootreact1.springreact2.dto.response.ApiResponseSuccess;
import springbootreact1.springreact2.dto.response.ProductsResponseDTO;
import springbootreact1.springreact2.service.ProductService;

import java.util.List;

@Controller
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponseSuccess<List<ProductsResponseDTO>>> getAllProducts() {
        return ResponseEntity.status(200).body(new ApiResponseSuccess<>("200", productService.getAllProducts()));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponseSuccess<String>> addProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        productService.addProduct(productRequestDTO);
        return ResponseEntity.status(201).body(new ApiResponseSuccess<>("201", "Product added successfully"));
    }
}
