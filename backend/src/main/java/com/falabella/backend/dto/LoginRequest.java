package com.falabella.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String tipoDocumento;

    private String numeroDocumento;

    private String claveInternet;
}