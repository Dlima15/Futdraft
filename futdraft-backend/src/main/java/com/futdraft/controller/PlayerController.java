package com.futdraft.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futdraft.model.Player;
import com.futdraft.repository.PlayerRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // libera o front local, opcional
public class PlayerController {

    private final PlayerRepository playerRepository;

    /** Criar jogador */
    @PostMapping
    public Player criarPlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    /** Listar todos os jogadores */
    @GetMapping
    public List<Player> listarTodos() {
        return playerRepository.findAll();
    }

    /** Listar jogadores de um jogo específico */
    @GetMapping("/game/{gameId}")
    public List<Player> listarPorJogo(@PathVariable UUID gameId) {
        return playerRepository.findByGameId(gameId);
    }

    /** Deletar jogador */
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        playerRepository.deleteById(id);
    }
}
