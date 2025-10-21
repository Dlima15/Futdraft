package com.futdraft.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.futdraft.model.Player;
import com.futdraft.repository.PlayerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DraftService {

    private final PlayerRepository playerRepository;

    public Map<String, List<String>> sortearTimes(UUID gameId, String mode, int teamsCount) {
        // Busca todos os jogadores confirmados daquele jogo e cria lista mutável
        List<Player> players = new ArrayList<>(
                playerRepository.findByGameId(gameId)
                        .stream()
                        .filter(Player::isConfirmed)
                        .toList()
        );

        // Embaralha a lista (aleatoriedade)
        Collections.shuffle(players);

        // Cria os times vazios
        Map<String, List<String>> times = new LinkedHashMap<>();
        for (int i = 1; i <= teamsCount; i++) {
            times.put("Time " + i, new ArrayList<>());
        }

        // Distribui os jogadores um por um em rodízio (sem repetir)
        int i = 0;
        for (Player player : players) {
            int timeIndex = i % teamsCount;
            String timeKey = "Time " + (timeIndex + 1);
            times.get(timeKey).add(player.getName());
            i++;
        }

        return times;
    }
}
