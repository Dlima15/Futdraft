package com.futdraft.repository;

import com.futdraft.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

/**
 * Repositório responsável por acessar os dados de jogadores.
 * O Spring Data cria os métodos automaticamente com base no nome.
 */
public interface PlayerRepository extends JpaRepository<Player, UUID> {

    /** Retorna todos os jogadores de um jogo específico */
    List<Player> findByGameId(UUID gameId);

    /** Retorna todos os jogadores de um usuário (caso esteja vinculado) */
    List<Player> findByUserId(UUID userId);
}
