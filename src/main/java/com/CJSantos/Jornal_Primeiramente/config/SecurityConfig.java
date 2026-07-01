package com.CJSantos.Jornal_Primeiramente.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // ← Add this to enable @PreAuthorize
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Rotas públicas
                        .requestMatchers("/auth/login", "/auth/register", "/", "/error").permitAll()
                        // Somente ADMIN cria, edita e deleta edições
                        .requestMatchers(HttpMethod.POST, "/edition/create", "/edition/create-announcement").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/edition/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/edition/**").hasRole("ADMIN")
                        // Leitura de edições e mídias é pública para autenticados
                        .requestMatchers(HttpMethod.GET, "/edition/**", "/media/**").authenticated()
                        // Tudo mais requer autenticação
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}