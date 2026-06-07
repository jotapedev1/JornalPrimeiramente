package com.CJSantos.Jornal_Primeiramente.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}