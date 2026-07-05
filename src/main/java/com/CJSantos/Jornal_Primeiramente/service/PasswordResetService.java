// PasswordResetService.java
package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.PasswordResetTokenModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.PasswordResetTokenRepository;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
        String resetLink = frontendUrl + "reset-password?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Recuperação de Senha - Jornal Primeiramente");

            String htmlContent =
                    "<html>" +
                            "<body style='font-family: Arial, sans-serif; color: #333;'>" +
                            "<h2>Jornal Primeiramente</h2>" +
                            "<p>Olá!</p>" +
                            "<p>Você solicitou a recuperação de senha para sua conta.</p>" +
                            "<p><a href='" + resetLink + "' " +
                            "style='display:inline-block; padding:10px 20px; background-color:#e30000; " +
                            "color:#fff; text-decoration:none; border-radius:5px;'>Redefinir Senha</a></p>" +
                            "<p>Ou copie e cole este link no seu navegador/dispositivo:</p>" +
                            "<p>" + resetLink + "</p>" +
                            "<p>Este link é válido por " + EXPIRATION_MINUTES + " minutos.</p>" +
                            "<p>Se você não solicitou esta recuperação, ignore este e-mail.</p>" +
                            "<p>Atenciosamente,<br/>Equipe Jornal Primeiramente</p>" +
                            "</body>" +
                            "</html>";

            helper.setText(htmlContent, true); // true = isHtml

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail de recuperação: " + e.getMessage());
        }
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