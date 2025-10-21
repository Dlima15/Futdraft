package com.futdraft.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futdraft.model.Game;
import com.futdraft.service.GameService;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:5173") // libera o frontend local
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // ====== CRUD BÁSICO ======

    @PostMapping("/{ownerId}")
    public ResponseEntity<Game> createGame(@RequestBody Game game, @PathVariable UUID ownerId) {
        return ResponseEntity.ok(gameService.createGame(game, ownerId));
    }

    @GetMapping
    public ResponseEntity<List<Game>> listAllGames() {
        return ResponseEntity.ok(gameService.listAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(gameService.getGameById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable UUID id, @RequestBody Game updatedGame) {
        return ResponseEntity.ok(gameService.updateGame(id, updatedGame));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable UUID id) {
        gameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }

    // ====== CONSULTAS EXTRAS ======

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Game>> listByOwner(@PathVariable UUID ownerId) {
        return ResponseEntity.ok(gameService.listByOwner(ownerId));
    }

    @GetMapping("/owner/{ownerId}/week")
    public ResponseEntity<List<Game>> listThisWeek(@PathVariable UUID ownerId) {
        return ResponseEntity.ok(gameService.listGamesThisWeek(ownerId));
    }

    
}