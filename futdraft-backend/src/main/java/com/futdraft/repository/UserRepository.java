package com.futdraft.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futdraft.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
}
