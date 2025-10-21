package com.futdraft.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.futdraft.model.Player;

/**
 * Repositório responsável por acessar os dados de jogadores.
 * O Spring Data cria os métodos automaticamente com base no nome.
 */
public interface PlayerRepository extends JpaRepository<Player, UUID> {

    /** Retorna todos os jogadores de um jogo específico */
    List<Player> findByGameId(UUID gameId);

    /** Retorna todos os jogadores de um usuário (caso esteja vinculado) */
    List<Player> findByUserId(UUID userId);

    /** 
     * Retorna apenas os jogadores confirmados (confirmed = true)
     * de um jogo específico — usado no sorteio 
     */
    @Query("SELECT p FROM Player p WHERE p.game.id = :gameId AND p.confirmed = true")
    List<Player> findConfirmedByGameId(UUID gameId);
}
