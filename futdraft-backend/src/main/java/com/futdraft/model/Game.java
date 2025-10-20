package com.futdraft.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa um jogo (pelada) criado por um usuário.
 * Cada jogo tem informações básicas como data, local e o usuário que criou.
 */

@Entity
@Table(name = "game")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Game{
   
    /** Identificador único (UUID) gerado automaticamente */
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id; 

    /* Data e a hora da partida */
    @Column(nullable= false)
    private LocalDateTime date; 

    /** Nome ou descrição curta do local */
    @Column( nullable = false, length = 160)
    private String location; 

    /**Quantidade de jogadores por time 5,7 ou até 11 */
    @Column (nullable = false)
    private Integer teamSize; 

    /**Momento em que o jogo foi criado */
    @Column (name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

     /**
     * Relacionamento com o usuário que criou o jogo.
     * 
     * @ManyToOne → vários jogos podem ser criados por um mesmo usuário.
     * @JoinColumn → cria a chave estrangeira user_id na tabela "game".
     */

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

}