package com.futdraft.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * Representa um jogador que participa das peladas.
 * Pode estar vinculado a um usuário cadastrado ou apenas identificado pelo nome.
 */

@Entity
@Table(name = "player") // Cria a tabela "player" no banco
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Player {
    /**Identifcador unico do jogador UUID */
    @Id
    @GeneratedValue(strategy =  GenerationType.UUID)
    private UUID id; /** Chave primaria única */

    /** Nome do Jogador - obrigatorio */
    @Column(nullable = false, length = 100)
    private String name; // nome do jogador

    /** indica de confirmou presença ( util para o owner pra ver quem vai) */
    @Column(nullable = false)
    private boolean confirmed = false; /** False ainda não confirmou */

    /**Referencia ao jogo que esse jogador pertence*/
    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false )
    private Game game;/** Muitos jogadores podem estar no mesmo jogo */

    /* Usuario dono desse jogador (opcional)
     * Se for um jogador fixo do sistema (usuário logado), ele estará vinculado a um User.
     * Se for um convidado, o campo pode ficar nulo.
     */

    @ManyToOne
    @JoinColumn(name = ("user_id"))
    private User user; /** Jogador pode ser anonimo ou vinculado a um usuario*/

        /**
     * Time ao qual o jogador pertence.
     * Muitos jogadores podem estar em um mesmo time.
     */
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team; //Relacionamento opcional (pode estar null se o jogador ainda não foi sorteado)

}