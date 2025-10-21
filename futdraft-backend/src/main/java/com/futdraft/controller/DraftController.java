package com.futdraft.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.futdraft.service.DraftService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class DraftController {

    private final DraftService draftService;

    @PostMapping("/{gameId}/draft")
    public Map<String, List<String>> sortearTimes(
            @PathVariable UUID gameId,
            @RequestParam(defaultValue = "random") String mode,
            @RequestParam(defaultValue = "2") int teams
    ) {
        return draftService.sortearTimes(gameId, mode, teams);
    }
}
