# 🛍️ Mini Ecommerce - Full Stack App

**Mini Ecommerce** es una aplicación web full stack que simula un sistema de compras en línea.  
El proyecto integra un **frontend moderno con React + TypeScript + TailwindCSS** y un **backend robusto en Spring Boot (Java 17)** con persistencia en **H2 Database**, permitiendo gestionar productos, carritos de compra e historial de pagos.

---

## 🚀 Tecnologías Utilizadas

### 🖥️ Frontend
- **React 19 + TypeScript**
- **Vite** como herramienta de build
- **TailwindCSS** para estilos responsivos
- **React Router DOM** para navegación
- **React Icons** para iconografía
- **React Context API + Hooks personalizados** para la gestión del carrito

### ⚙️ Backend
- **Spring Boot 3**
- **Java 17**
- **Spring Data JPA**
- **H2 Database** (modo embebido)
- **Lombok** para reducción de boilerplate
- **Spring Web** para la capa REST
- **Cross-Origin (CORS)** habilitado para comunicación con el frontend

---

## 🧩 Estructura del Proyecto

### 📦 Frontend (`/front`)
```
front/
├── src/
│   ├── api/              # Lógica para peticiones a la API (fetch/axios)
│   ├── components/       # Componentes UI reutilizables
│   ├── context/          # Contexto global (CartContext)
│   ├── hooks/            # Hooks personalizados para reusar en los diferentes contextos de la app
│   ├── pages/            # Páginas principales (Home, AddProduct, etc.)
│   ├── types/            # Se definen tipos de datos de objetos, componentes, etc.
│   ├── utils/            # Funcionalidades y lógica extra como el mapeo de categorias para evitar errores de compilación.
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── App.tsx           # Enrutador principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Configuración de Tailwind
└── package.json
```

### 🧱 Backend (`/back`)
```
back/
├── src/main/java/com.e_commerce.mini
│   ├── controllers/      # Controladores REST
│   ├── dtos/             # Objetos para transferencia de datos entre capas
│   ├── mappers/          # Mapeadores para pasar de dto a entidades y visceversa (ProductMapper)
│   ├── enums/            # Clase con la lista de categorias
│   ├── exceptions/       # Administrador global de excepciones
│   ├── entities/         # Entidades JPA (Product, PaymentHistory)
│   ├── repositories/     # Interfaces JpaRepository
│   ├── services/         # Lógica de negocio
│   ├── seeder/           # Carga inicial de datos (DataLoader)
│   └── MiniApplication.java
└── pom.xml
```

---

## 🧠 Descripción Técnica

### 🛒 Lógica del Carrito (Frontend)
El **CartContext** maneja todo el estado del carrito globalmente:
- Agregar, actualizar y eliminar productos.
- Control de cantidades con validación de stock.
- Cálculo automático de subtotal, impuestos (IVA 19%) y total.
- Persistencia en memoria (estado temporal, sin login).

Se utilizan **hooks** personalizados y el **Context API**:
```tsx
const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
```

### 🧾 Flujo de Pago
1. El usuario agrega productos al carrito.
2. Al presionar **“Pagar”**, se envía una petición `POST /api/payments` al backend.
3. El backend:
   - Valida disponibilidad de stock.
   - Registra el pago (`PaymentHistory`).
   - Actualiza el stock en la base de datos.

---

## 💾 Base de Datos (H2)

El sistema utiliza **H2 Database** en modo embebido para pruebas locales.  
Puedes acceder al panel de H2 desde:

```
http://localhost:8080/h2-commerce
```

Configuración en el panel web:
```
JDBC URL: jdbc:h2:mem:commerce
User: sa
Password: (vacío)
```

Aunque en el `application.properties` ya viene incluida toda la configuración para su uso:
```application.properties
spring.application.name=mini-ecommerce

spring.datasource.url=jdbc:h2:mem:commerce
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.platform=h2

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.h2.console.path=/h2-commerce
spring.jpa.hibernate.ddl-auto=update
```

Tablas principales:
- `product` → Productos disponibles
- `payment_history` → Historial de compras
- `payment_product_quantities` → Mapeo producto-cantidad por compra

---

## 🧠 Entidades Principales

### 🧩 Product
```java
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column (length = 1000)
    private String description;
    private Double price;
    private Integer stock;

    @Enumerated (EnumType.STRING)
    private Categories category;

    @Column(length = 1000)
    private String photo;

    public Product(String name, String description, Double price, Integer stock, Categories category, String photo) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.photo = photo;
    }
}
```

### 💳 PaymentHistory
```java
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistory {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime purchaseDate;
    private Double subtotal;
    private Double total;
    private Double tax;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "payment_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @ElementCollection
    @CollectionTable(
            name = "payment_product_quantities",
            joinColumns = @JoinColumn(name = "payment_id")
    )
    @MapKeyColumn(name = "product_id") // antes era @MapKeyJoinColumn
    private Map<Long, Integer> productQuantities;
```

---

## 🧭 Endpoints Principales

### 📦 Productos
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `GET`  | `/api/products` | Obtener todos los productos |
| `GET`  | `/api/products/{id}` | Obtener producto por ID |
| `POST` | `/api/products` | Crear un nuevo producto |

### 💰 Pagos
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `POST` | `/api/payments` | Registrar una compra |

**Ejemplo de request de compra (`POST /api/payments`):**
```json
{
  "products": [
    { "id": 1 },
    { "id": 2 }
  ],
  "productQuantities": {
    "1": 2,
    "2": 1
  }
}
```

---

## ⚙️ Instrucciones de Instalación

Para poder ejecutar el backend, es necesario tener instalado java 17. En cuanto a maven, no es necesario ya que el backend cuenta con su archivo `.jar` listo para ejecutarse.

### 🔧 Backend (Spring Boot)
```bash
# Clonar el repositorio
git clone https://github.com/Alejandro-Ospina/mini-ecommerce.git
cd mini-ecommerce/backend
```

Dirigirse al directorio `target` dentro de `backend`, y allí abrir una terminal para ejecutar el siguiente comando:
```bash
java -jar mini-1.jar
```

Servidor:  
👉 `http://localhost:8080`

Para acceder a la base de datos embebida:
👉 `http://localhost:8080/h2-commerce`

---

### 💻 Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
```

Aplicación:  
👉 `http://localhost:5173`

---

## 🎨 Interfaz de Usuario

- Navbar fija con navegación intuitiva.
- Home con listado de productos filtrables por categoría.
- Sidebar de carrito con animación y modal de confirmación.
- Página **“Agregar Producto”** con formulario dinámico y validaciones.

---

## 🧰 Características Técnicas Destacadas

- Diseño **responsive** y moderno con Tailwind.
- **Manejo de estado global** (React Context).
- **Validaciones dinámicas** de stock en el carrito.
- **Integración completa Front-Back** mediante API REST.
- Arquitectura limpia, extensible y modular.

---

## 🧑‍💻 Autor

**Alejandro Ospina Castaño**  
Desarrollador Full Stack  
📧 [aopsina@utp.edu.co](mailto:aopsina@utp.edu.co)

---

## 🪪 Licencia

Este proyecto se distribuye bajo los términos de la licencia incluida en el repositorio.
