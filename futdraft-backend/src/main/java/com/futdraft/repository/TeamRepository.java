package com.futdraft.repository;

import com.futdraft.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

/**
 * Repositório para operações com a tabela "team".
 * O Spring Data gera consultas automáticas com base no nome dos métodos.
 */
public interface TeamRepository extends JpaRepository<Team, UUID> {

    /** Retorna todos os times de um jogo específico */
    List<Team> findByGameId(UUID gameId);
}
