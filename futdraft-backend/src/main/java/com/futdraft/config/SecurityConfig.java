package com.futdraft.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa proteção CSRF (para testes de API)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Libera todas as rotas
            )
            .formLogin(form -> form.disable()) // Remove tela de login
            .httpBasic(basic -> basic.disable()); // Remove autenticação básica

        return http.build();
    }
}
