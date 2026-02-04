# Banking Application

A simple Spring Boot banking application that allows users to create accounts, deposit and withdraw money, search accounts, and export account data to Excel.

## Key Annotations and Imports Guide

### Core Spring Annotations

1. **@SpringBootApplication**
   - Used in `BobApplication.java`
   - Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan
   - Marks the main class that bootstraps the Spring application

2. **@Controller / @RestController**
   - `@Controller`: Used in `WebController.java` for serving web pages
   - `@RestController`: Used in `AccountController.java` for REST API endpoints
   - Difference: @RestController automatically adds @ResponseBody to all methods

3. **@Service**
   - Used in `AccountService.java` and `ExcelExportService.java`
   - Marks a class as a service component in business layer

4. **@Repository**
   - Used in `AccountRepository.java`
   - Marks a class as a data access component

5. **@Autowired**
   - Used to inject dependencies (e.g., repositories into services, services into controllers)
   - Enables automatic dependency injection

### JPA/Database Annotations

1. **@Entity**
   - Used in `Account.java`
   - Marks a class as a JPA entity (mapped to database table)

2. **@Id**
   - Marks a field as the primary key

3. **@GeneratedValue**
   - Configures how primary key values are generated

4. **@Query**
   - Used in `AccountRepository.java`
   - Defines custom JPQL queries

5. **@Param**
   - Maps method parameters to query parameters

### Request Handling Annotations

1. **@RequestMapping**
   - Base URL mapping for controller classes

2. **@GetMapping / @PostMapping / @DeleteMapping**
   - HTTP method-specific mappings for controller methods

3. **@PathVariable**
   - Extracts values from URL path segments

4. **@RequestParam**
   - Extracts query parameters from URL

5. **@RequestBody**
   - Binds HTTP request body to method parameter

### Key Imports

1. **Spring Framework**
   ```java
   import org.springframework.stereotype.*;
   import org.springframework.web.bind.annotation.*;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.http.*;
   import org.springframework.core.io.*;
   ```

2. **JPA/Database**
   ```java
   import org.springframework.data.jpa.repository.*;
   import jakarta.persistence.*;
   ```

3. **Validation**
   ```java
   import jakarta.validation.constraints.*;
   ```

4. **Lombok (Reduces Boilerplate)**
   ```java
   import lombok.Getter;
   import lombok.Setter;
   ```

5. **Excel Export**
   ```java
   import org.apache.poi.ss.usermodel.*;
   import org.apache.poi.xssf.usermodel.*;
   ```

6. **Java Utilities**
   ```java
   import java.util.List;
   import java.util.Optional;
   import java.math.BigDecimal;
   import java.io.*;
   ```

## API Endpoints

- `POST /api/accounts` - Create a new account
- `GET /api/accounts/{id}` - Get account details
- `POST /api/accounts/{id}/deposit` - Deposit money
- `POST /api/accounts/{id}/withdraw` - Withdraw money
- `DELETE /api/accounts/{id}` - Delete an account
- `GET /api/accounts/search?name=...` - Search accounts by name
- `GET /api/accounts/export/excel` - Export all accounts to Excel

## Frontend Features

- Create new accounts
- View account details
- Deposit and withdraw money
- Search accounts by name
- Delete accounts
- Export all accounts to Excel
