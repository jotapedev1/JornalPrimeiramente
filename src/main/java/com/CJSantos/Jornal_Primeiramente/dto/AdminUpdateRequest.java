package com.CJSantos.Jornal_Primeiramente.dto;

import com.CJSantos.Jornal_Primeiramente.model.Role;
import lombok.Data;

@Data
public class AdminUpdateRequest {
    private String userName;
    private String userEmail;
    private Role userRole; // Can promote/demote users
}