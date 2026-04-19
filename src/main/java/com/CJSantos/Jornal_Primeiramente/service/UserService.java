package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder; //PasswordEncoder it's an interface from the security dependency we have

    public UserModel createUser(UserModel user) {
        String hashedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserHash(hashedPassword);

        //no email already registred
        if (userRepository.findByUserEmail(user.getUserEmail()) != null) {
            throw new RuntimeException("Email já existe");
        }
        user.setUserCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));
    }

    public UserModel updateUser(UUID id, UserModel updatedUser) { //updated being used as a temp var
        UserModel user = getUserById(id);
        //set the email and name for the new ones
        user.setUserEmail(updatedUser.getUserEmail());
        user.setUserName(updatedUser.getUserName());

        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
