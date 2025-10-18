package com.e_commerce.mini.Seeder;

import com.e_commerce.mini.Entities.Product;
import com.e_commerce.mini.Enums.Categories;
import com.e_commerce.mini.Repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.nio.file.Files;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        productRepository.save(new Product(
                "Laptop Gamer Alienware",
                "Potente laptop para gaming con procesador Intel i9, 32GB RAM, tarjeta gráfica NVIDIA RTX 4080, almacenamiento SSD de 1TB y pantalla 4K de 17 pulgadas. Ideal para jugadores exigentes y edición de video profesional.",
                4500.0,
                5,
                Categories.TECNOLOGIA,
                "https://images.unsplash.com/photo-1634947096506-6d9f114cf64e"
        ));

        productRepository.save(new Product(
                "Smart TV Samsung 55\"",
                "Smart TV LED de 55 pulgadas con resolución 4K UHD, HDR, sistema Tizen, múltiples puertos HDMI y USB, conectividad Wi-Fi y compatibilidad con asistentes de voz. Experiencia de cine en casa garantizada.",
                1200.0,
                10,
                Categories.ELECTRODOMESTICOS,
                "https://images.unsplash.com/photo-1615210230840-69c07c13b4d1"
        ));

        productRepository.save(new Product(
                "Camiseta Deportiva Mujer",
                "Camiseta ligera y transpirable de alta calidad, perfecta para running, gimnasio o actividades al aire libre. Material de secado rápido y diseño ergonómico que garantiza comodidad todo el día.",
                45.0,
                50,
                Categories.ROPA_MUJER,
                "https://images.unsplash.com/photo-1659081442328-b99758bb2053"
        ));

        productRepository.save(new Product(
                "Camisa Casual Hombre",
                "Camisa de algodón premium para hombre, de corte moderno, suave y resistente. Ideal para el día a día o eventos casuales. Disponible en múltiples colores y tallas.",
                60.0,
                40,
                Categories.ROPA_HOMBRE,
                "https://images.unsplash.com/photo-1602810318660-d2c46b750f88"
        ));

        productRepository.save(new Product(
                "Set de Juguetes Educativos",
                "Juego completo de bloques y rompecabezas para niños de 3 a 8 años. Estimula la creatividad, habilidades motoras y pensamiento lógico. Incluye 150 piezas de diferentes colores y formas.",
                55.0,
                25,
                Categories.JUGUETES,
                "https://images.unsplash.com/photo-1591020270735-d4fc1a514a7d"
        ));

        productRepository.save(new Product(
                "Laptop Ultraliviana Dell XPS",
                "Laptop ultraportátil Dell XPS de 13 pulgadas, procesador Intel i7, 16GB RAM, almacenamiento SSD 512GB, pantalla táctil InfinityEdge. Ideal para profesionales en movilidad.",
                2200.0,
                8,
                Categories.TECNOLOGIA,
                "https://images.unsplash.com/photo-1654119895136-6aad918f412c"
        ));

        productRepository.save(new Product(
                "Auriculares Bluetooth Sony",
                "Auriculares inalámbricos Sony con cancelación de ruido activa, batería de 30 horas, micrófono incorporado y sonido envolvente de alta fidelidad. Perfectos para música y videollamadas.",
                250.0,
                30,
                Categories.TECNOLOGIA,
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"
        ));

        productRepository.save(new Product(
                "Reloj Inteligente Fitness",
                "Smartwatch resistente al agua con monitor de ritmo cardíaco, GPS integrado, seguimiento de actividad diaria, notificaciones de llamadas y mensajes. Compatible con Android y iOS.",
                180.0,
                20,
                Categories.TECNOLOGIA,
                "https://images.unsplash.com/photo-1733570890170-49be2550189b"
        ));
    }
}
