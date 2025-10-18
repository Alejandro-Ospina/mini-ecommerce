package com.e_commerce.mini.Services;

import com.e_commerce.mini.DTOs.AddProductDTO;
import com.e_commerce.mini.Entities.Product;
import com.e_commerce.mini.Enums.Categories;
import com.e_commerce.mini.Mappers.ProductMapper;
import com.e_commerce.mini.Repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private static final Map<String, Categories> comparison = new HashMap<>();

    static{
        comparison.put("Electrodomésticos", Categories.ELECTRODOMESTICOS);
        comparison.put("Tecnología", Categories.TECNOLOGIA);
        comparison.put("Ropa Mujer", Categories.ROPA_MUJER);
        comparison.put("Ropa Hombre", Categories.ROPA_HOMBRE);
        comparison.put("Ropa Niños(as)", Categories.ROPA_NINOS);
        comparison.put("Juguetes", Categories.JUGUETES);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProduct(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(AddProductDTO productDto){
        var product = productMapper.dtoToProduct(productDto);
        Categories category = comparison.get(productDto.category());
        product.setCategory(category);
        return productRepository.save(product);
    }
}
