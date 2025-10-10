package com.CJSantos.Jornal_Primeiramente.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class integranteController {
    @GetMapping("/teste")
    public String teste() {
        return "🐛 API do Jornal Primeiramente está rodando!";
    }
}