package com.futdraft.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.futdraft.model.Game;
import com.futdraft.model.User;
import com.futdraft.repository.GameRepository;
import com.futdraft.repository.UserRepository;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public GameService(GameRepository gameRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    /** Criar novo jogo */
    public Game createGame(Game game, UUID ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Usuário (organizador) não encontrado"));
        game.setOwner(owner);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }

    /** Listar todos os jogos */
    public List<Game> listAllGames() {
        return gameRepository.findAll();
    }

    /** Buscar por ID */
    public Game getGameById(UUID id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));
    }

    /** Atualizar (editar) jogo */
    public Game updateGame(UUID id, Game updatedGame) {
        Game game = getGameById(id);

        if (updatedGame.getDate() != null) game.setDate(updatedGame.getDate());
        if (updatedGame.getLocation() != null) game.setLocation(updatedGame.getLocation());
        if (updatedGame.getTeamSize() != null) game.setTeamSize(updatedGame.getTeamSize());

        return gameRepository.save(game);
    }

    /** Deletar jogo */
    public void deleteGame(UUID id) {
        gameRepository.deleteById(id);
    }

    /** Listar jogos de um organizador */
    public List<Game> listByOwner(UUID ownerId) {
        return gameRepository.findByOwnerId(ownerId);
    }

    /** Listar jogos por semana (intervalo de datas) */
    public List<Game> listGamesThisWeek(UUID ownerId) {
        LocalDateTime start = LocalDateTime.now().minusDays(3);
        LocalDateTime end = LocalDateTime.now().plusDays(7);
        return gameRepository.findByOwnerIdAndDateBetween(ownerId, start, end);
    }
}
