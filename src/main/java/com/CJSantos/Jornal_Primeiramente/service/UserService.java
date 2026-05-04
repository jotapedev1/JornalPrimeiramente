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

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserModel createUser(UserModel user) {
        String hashedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserHash(hashedPassword);

        if (userRepository.findByUserEmail(user.getUserEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        user.setUserCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserModel getUserByEmail(String email) {
        UserModel user = userRepository.findByUserEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }

    public UserModel updateUser(UUID id, UserModel updatedUser) {
        UserModel user = getUserById(id);
        user.setUserEmail(updatedUser.getUserEmail());
        user.setUserName(updatedUser.getUserName());
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}