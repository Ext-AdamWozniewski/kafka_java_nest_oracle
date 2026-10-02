package com.example.extractor;

import java.time.Instant;

public record Ticket(long id, String title, String description, String status, Instant updatedAt) {
}
