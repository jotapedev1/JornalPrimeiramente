/*
package com.CJSantos.Jornal_Primeiramente.Infra.Security;


import com.CJSantos.Jornal_Primeiramente.model.MemberModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class TokenService {
@Value("${api.security.token.secret}")
    private String secret;
    public String generateToken(UserModel user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("login-auth-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.generateExprationTime())
                    .sign(algorithm);
        return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token", exception);
        }
    }
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception){
            return null;
        }
    }
    private Instant generateExprationTime(){
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        return Instant.from(LocalDateTime.now(zoneId).plusHours(2));
    }
}
 */