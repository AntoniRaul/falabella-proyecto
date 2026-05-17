package com.falabella.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AuthResponse {
    private UUID id;
    private String nombreCompleto;
    private String email;
    private String tipoDocumento;
    private String numeroDocumento;
    private BigDecimal saldo;
    private String productoPrincipal;
    private String token;
}