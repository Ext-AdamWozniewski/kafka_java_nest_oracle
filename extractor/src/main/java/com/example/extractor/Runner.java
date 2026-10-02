package com.example.extractor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class Runner implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;

    public Runner(JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

    @Override
    public void run(String... args) {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM tickets", Integer.class);
        System.out.println("Tickets in DB: " + count + " items");
    }
}
