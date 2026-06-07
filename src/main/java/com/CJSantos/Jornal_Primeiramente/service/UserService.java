package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Public methods
    public List<UserModel> getAllUsers() {
        return userRepository.findAll();  // Fixed from findOne
    }

    public UserModel getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public UserModel getUserByEmail(String email) {
        UserModel user = userRepository.findByUserEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }

    public UserModel createUser(UserModel user) {
        // Check if email already exists
        if (userRepository.findByUserEmail(user.getUserEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        // Hash the password
        if (user.getUserPassword() != null && !user.getUserPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(user.getUserPassword());
            user.setUserHash(hashedPassword);
        }

        user.setUserCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public UserModel updateUser(UUID id, UserModel updatedUser) {
        UserModel user = getUserById(id);

        if (updatedUser.getUserEmail() != null) {
            user.setUserEmail(updatedUser.getUserEmail());
        }
        if (updatedUser.getUserName() != null) {
            user.setUserName(updatedUser.getUserName());
        }
        if (updatedUser.getUserRole() != null) {
            user.setUserRole(updatedUser.getUserRole());
        }

        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public void changePassword(String email, String currentPassword, String newPassword) {
        UserModel user = getUserByEmail(email);

        // Verifica se a senha atual está correta
        if (!passwordEncoder.matches(currentPassword, user.getUserHash())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("A nova senha deve ter no mínimo 6 caracteres");
        }

        user.setUserHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}