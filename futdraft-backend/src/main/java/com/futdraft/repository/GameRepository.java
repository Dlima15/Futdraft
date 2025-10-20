package com.futdraft.repository;

import com.futdraft.model.Game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.support.JpaRepositoryConfigurationAware;

/** Repositorio = camada de acesso ao banco (CRUD pronto) 
 *  Jparepository<Game, UUId> Fornece: save, Findby, FIndall, delete, Etc.
 * */

public interface GameRepository extends JpaRepository<Game, UUID> {
    
    /**   essa função busca todos os jogos de um organizador específico*/
    List<Game> findByOwnerId(UUID ownerId);

    /* Mesmo filtro, mas paginando/ ordenado Para Dashboard*/
    Page<Game> findByOwnerIdOrderByDateDesc(UUID ownerId, Pageable pageable);

    /* Quantos jogos esse usuário já criou ? */
    long countByOwnerId(UUID ownerId);

    /* Buscar jogos por intervalo de datas (ex: "desta semana"*/
    List<Game> findByOwnerIdAndDateBetween(UUID ownerId, LocalDateTime start, LocalDateTime end);

}
