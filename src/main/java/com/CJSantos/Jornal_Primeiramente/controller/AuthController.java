package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.Role;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import com.CJSantos.Jornal_Primeiramente.utils.JwtUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserModel user = userService.getUserByEmail(request.getEmail());

            String token = jwtUtil.generateToken(
                    user.getUserEmail(),
                    user.getUserId(),
                    user.getUserRole().name()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("email", user.getUserEmail());
            response.put("userName", user.getUserName());
            response.put("role", user.getUserRole().name());
            response.put("isAdmin", user.getUserRole() == Role.ADMIN);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            try {
                UserModel existingUser = userService.getUserByEmail(request.getEmail());
                if (existingUser != null) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
                }
            } catch (RuntimeException e) {
                // Email não encontrado, pode prosseguir com o cadastro
            }

            UserModel newUser = new UserModel();
            newUser.setUserName(request.getName());
            newUser.setUserEmail(request.getEmail());
            newUser.setUserPassword(request.getPassword());
            Role userRole = Role.valueOf(request.getRole());
            newUser.setUserRole(userRole);


            UserModel createdUser = userService.createUser(newUser);

            String token = jwtUtil.generateToken(
                    createdUser.getUserEmail(),
                    createdUser.getUserId(),
                    createdUser.getUserRole().name()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", createdUser.getUserId());
            response.put("email", createdUser.getUserEmail());
            response.put("userName", createdUser.getUserName());
            response.put("role", createdUser.getUserRole().toString());
            response.put("isAdmin", createdUser.getUserRole() == Role.ADMIN);
            response.put("message", "User created and logged in successfully");

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String password = request.get("password");

            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("valid", false, "error", "Senha não fornecida"));
            }

            // Pega o usuário atual autenticado
            UserModel currentUser = userService.getUserByEmail(userDetails.getUsername());

            // Verifica se a senha está correta
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(currentUser.getUserEmail(), password)
            );

            return ResponseEntity.ok(Map.of("valid", true));

        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false, "error", "Senha incorreta"));
        }
    }
}

// DTO Classes
@Data
class LoginRequest {
    private String email;
    private String password;
}

@Data
class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;
}