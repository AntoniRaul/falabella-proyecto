package com.falabella.backend.repository;

import com.falabella.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    Optional<Usuario> findByTipoDocumentoAndNumeroDocumento(String tipoDocumento, String numeroDocumento);
}
