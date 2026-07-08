package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.Media;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class CoverGeneratorService {

    // Dimensões padrão do card (16:9, boas para grid de cards)
    private static final int CARD_WIDTH = 800;
    private static final int CARD_HEIGHT = 450;

    // Paleta por tipo de mídia — mantém identidade visual consistente
    private static final Map<Media, Color[]> PALETTE = Map.of(
            Media.ARTICLE, new Color[]{ new Color(0x1E3A8A), new Color(0x3B82F6) },
            Media.POETRY,  new Color[]{ new Color(0x581C87), new Color(0x9333EA) },
            Media.TEXT,    new Color[]{ new Color(0x14532D), new Color(0x22C55E) },
            Media.DRAWING, new Color[]{ new Color(0x9A3412), new Color(0xF97316) },
            Media.WARNING, new Color[]{ new Color(0x7F1D1D), new Color(0xEF4444) }
    );

    /**
     * Renderiza a primeira página de um PDF como imagem de capa (PNG).
     * Usado para mídias do tipo ARTICLE quando o autor não envia capa própria.
     */
    public byte[] generateFromPdf(byte[] pdfBytes) throws IOException {
        
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            if (document.getNumberOfPages() == 0) {
                throw new IOException("PDF sem páginas");
            }

            PDFRenderer renderer = new PDFRenderer(document);
            // DPI moderado: nítido o bastante para thumbnail, sem gerar imagem gigante
            BufferedImage rendered = renderer.renderImageWithDPI(0, 120);

            return fitAndEncode(rendered);
        }
    }

    /**
     * Gera um card visual (título + trecho + gradiente) para mídias sem
     * arquivo de origem visual (TEXTO, POESIA, AVISO) quando não há capa enviada.
     */
    public byte[] generateFromText(String title, String snippet, Media mediaType) throws IOException {
        BufferedImage image = new BufferedImage(CARD_WIDTH, CARD_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        Color[] colors = PALETTE.getOrDefault(mediaType, new Color[]{ new Color(0x374151), new Color(0x6B7280) });
        GradientPaint gradient = new GradientPaint(0, 0, colors[0], CARD_WIDTH, CARD_HEIGHT, colors[1]);
        g.setPaint(gradient);
        g.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

        // Selo do tipo de mídia (canto superior esquerdo)
        g.setFont(new Font("SansSerif", Font.BOLD, 22));
        g.setColor(new Color(255, 255, 255, 180));
        g.drawString(mediaType.name(), 48, 60);

        // Título, com quebra de linha manual respeitando a largura do card
        g.setFont(new Font("Serif", Font.BOLD, 44));
        g.setColor(Color.WHITE);
        drawWrappedText(g, title == null ? "" : title, 48, 140, CARD_WIDTH - 96, 52);

        // Trecho do conteúdo, menor e mais discreto, na parte inferior
        if (snippet != null && !snippet.isBlank()) {
            g.setFont(new Font("SansSerif", Font.PLAIN, 22));
            g.setColor(new Color(255, 255, 255, 200));
            String trimmed = snippet.length() > 160 ? snippet.substring(0, 160) + "…" : snippet;
            drawWrappedText(g, trimmed, 48, CARD_HEIGHT - 120, CARD_WIDTH - 96, 30);
        }

        g.dispose();
        return encodePng(image);
    }

    /** Usa a própria imagem enviada (caso DRAWING) como base da capa, redimensionada pro card. */
    public byte[] generateFromImage(byte[] imageBytes) throws IOException {
        BufferedImage source = ImageIO.read(new java.io.ByteArrayInputStream(imageBytes));
        if (source == null) {
            throw new IOException("Não foi possível ler a imagem enviada");
        }
        return fitAndEncode(source);
    }

    private byte[] fitAndEncode(BufferedImage source) throws IOException {
        BufferedImage fitted = new BufferedImage(CARD_WIDTH, CARD_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = fitted.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        // Cover-fit: preenche o card cortando o excesso, sem distorcer proporção
        double scale = Math.max((double) CARD_WIDTH / source.getWidth(), (double) CARD_HEIGHT / source.getHeight());
        int scaledW = (int) Math.ceil(source.getWidth() * scale);
        int scaledH = (int) Math.ceil(source.getHeight() * scale);
        int x = (CARD_WIDTH - scaledW) / 2;
        int y = (CARD_HEIGHT - scaledH) / 2;

        g.drawImage(source, x, y, scaledW, scaledH, null);
        g.dispose();

        return encodePng(fitted);
    }

    private byte[] encodePng(BufferedImage image) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        return baos.toByteArray();
    }

    private void drawWrappedText(Graphics2D g, String text, int x, int y, int maxWidth, int lineHeight) {
        FontMetrics fm = g.getFontMetrics();
        StringBuilder line = new StringBuilder();
        int currentY = y;
        int maxLines = 4;
        int lineCount = 0;

        for (String word : text.split("\\s+")) {
            String candidate = line.isEmpty() ? word : line + " " + word;
            Rectangle2D bounds = fm.getStringBounds(candidate, g);

            if (bounds.getWidth() > maxWidth && !line.isEmpty()) {
                g.drawString(line.toString(), x, currentY);
                line = new StringBuilder(word);
                currentY += lineHeight;
                lineCount++;
                if (lineCount >= maxLines - 1) {
                    line.append("…");
                    break;
                }
            } else {
                line = new StringBuilder(candidate);
            }
        }
        if (!line.isEmpty()) {
            g.drawString(line.toString(), x, currentY);
        }
    }
}