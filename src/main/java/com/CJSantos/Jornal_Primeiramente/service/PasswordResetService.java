// PasswordResetService.java
package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.PasswordResetTokenModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.PasswordResetTokenRepository;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${app.base-url}")
    private String baseUrl;

    private static final int EXPIRATION_MINUTES = 60;

    @Transactional
    public void sendPasswordResetEmail(String email) {
        UserModel user = userRepository.findByUserEmail(email);

        if (user == null) {
            // Não revelar se o email existe por segurança
            return;
        }

        // Gerar token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);

        // Salvar token
        PasswordResetTokenModel resetToken = new PasswordResetTokenModel(user, token, expiryDate);
        tokenRepository.save(resetToken);

        // Enviar email
        sendResetEmail(user.getUserEmail(), token);
    }

    private void sendResetEmail(String email, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Recuperação de Senha - Jornal Primeiramente");
        message.setText(
                "Olá!\n\n" +
                        "Você solicitou a recuperação de senha para sua conta.\n\n" +
                        "Clique no link abaixo para redefinir sua senha:\n" +
                        resetLink + "\n\n" +
                        "Este link é válido por " + EXPIRATION_MINUTES + " minutos.\n\n" +
                        "Se você não solicitou esta recuperação, ignore este email.\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe Jornal Primeiramente"
        );
        mailSender.send(message);
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        PasswordResetTokenModel resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        // Verificar se token expirou ou já foi usado
        if (resetToken.isExpired() || resetToken.isUsed()) {
            throw new RuntimeException("Token inválido ou expirado");
        }

        // Atualizar senha
        UserModel user = resetToken.getUser();
        user.setUserHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Marcar token como usado
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        return true;
    }

    public boolean validateToken(String token) {
        return tokenRepository.findByToken(token)
                .map(resetToken -> !resetToken.isExpired() && !resetToken.isUsed())
                .orElse(false);
    }
}