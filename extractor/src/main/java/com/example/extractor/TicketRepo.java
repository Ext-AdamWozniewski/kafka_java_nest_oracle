package com.example.extractor;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public class TicketRepo {
    private final JdbcTemplate jdbcTemplate;

    public TicketRepo(JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

    public List<Ticket> findChangedSince(Instant since) {
        return this.jdbcTemplate.query("""
                        SELECT id, title, description, status, updated_at from tickets WHERE updated_at > ? ORDER BY updated_at
                        """, (rs, rowNum) -> new Ticket(
                        rs.getLong("id"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("status"),
                        rs.getTimestamp("updated_at").toInstant()),
                Timestamp.from(since)
        );
    }
}
