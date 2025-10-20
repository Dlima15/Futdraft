package com.futdraft.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

/**
 * Representa um time dentro de uma pelada (Game).
 * Cada jogo pode ter dois ou mais times, e cada time contém vários jogadores.
 */

@Entity
@Table(name = "team") //  Cria a tabela "team" no banco
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Team{
    /** Identificador unico do time */
    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**Nome do time ex Time azul time vermelho */
    @Column(nullable = false, length = 100)
    private String name; /** nome do time */

    /** Qiamtodade de gols marcados no jogo */
    @Column(nullable = false)
    private int goals = 0; //Gols começam com 0

    /**
     * Relação com o jogo (pelada) ao qual esse time pertence.
     * Muitos times podem estar em um mesmo jogo (ex: Time A e Time B dentro do mesmo Game).
     */

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = true)
    private Game game;

     /**
     * Relação com os jogadores que pertencem a esse time.
     * Um time pode ter vários jogadores.
     * mappedBy = "team" → diz que o dono da relação é o atributo 'team' na classe Player.
     * cascade = ALL → se o time for apagado, apaga todos os jogadores associados a ele.
     */
 
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Player> players = new ArrayList<>();

    /** Momento de criação do registro */
    @Column(name = "created_at")
    private Date createdAt = new Date(); //Data de criação padrão

}