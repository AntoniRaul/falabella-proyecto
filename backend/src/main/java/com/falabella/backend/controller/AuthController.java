package com.falabella.backend.controller;

import com.falabella.backend.dto.AuthResponse;
import com.falabella.backend.dto.LoginRequest;
import com.falabella.backend.model.Usuario;
import com.falabella.backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> userOpt = usuarioRepository
                .findByTipoDocumentoAndNumeroDocumento(
                        request.getTipoDocumento(),
                        request.getNumeroDocumento()
                );

        if (userOpt.isPresent()) {
            Usuario u = userOpt.get();
            if (u.getClaveInternet().equals(request.getClaveInternet())) {
                AuthResponse response = new AuthResponse(
                        u.getId(),
                        u.getNombreCompleto(),
                        u.getEmail(),
                        u.getTipoDocumento(),
                        u.getNumeroDocumento(),
                        u.getSaldo(),
                        u.getProductoPrincipal(),
                        UUID.randomUUID().toString()
                );
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Credenciales incorrectas");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(@RequestParam String id) {
        Optional<Usuario> userOpt = usuarioRepository.findById(UUID.fromString(id));
        if (userOpt.isPresent()) {
            Usuario u = userOpt.get();
            AuthResponse response = new AuthResponse(
                    u.getId(),
                    u.getNombreCompleto(),
                    u.getEmail(),
                    u.getTipoDocumento(),
                    u.getNumeroDocumento(),
                    u.getSaldo(),
                    u.getProductoPrincipal(),
                    "active"
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
}
