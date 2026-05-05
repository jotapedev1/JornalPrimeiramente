package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Fetch user from database
        UserModel userModel = userService.getUserByEmail(email);

        if (userModel == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        //logging
        System.out.println("Loading user: " + userModel.getUserEmail());
        System.out.println("Password hash: " + userModel.getUserHash());
        System.out.println("Role: " + userModel.getUserRole());

        // Check for null values
        if (userModel.getUserEmail() == null || userModel.getUserEmail().isEmpty()) {
            throw new UsernameNotFoundException("User email is null or empty");
        }

        if (userModel.getUserHash() == null || userModel.getUserHash().isEmpty()) {
            throw new UsernameNotFoundException("User password is null or empty for email: " + email);
        }

        if (userModel.getUserRole() == null) {
            throw new UsernameNotFoundException("User role is null for email: " + email);
        }

        // Create Spring Security User object
        return new User(
                userModel.getUserEmail(),
                userModel.getUserHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userModel.getUserRole().name()))
        );
    }
}