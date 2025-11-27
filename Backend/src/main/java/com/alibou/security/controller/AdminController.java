package com.alibou.security.controller;

import com.alibou.security.token.ConfirmationTokenRepository;
import com.alibou.security.role.Role;
import com.alibou.security.entities.User;
import com.alibou.security.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")

@RequiredArgsConstructor
public class AdminController {
    private  final UserRepository userRepository;
    private  final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/auth/users")
    public ResponseEntity<String> createUser(@RequestBody User request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur: L'NameRespense est déjà pris!");
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .verified(true)
                .build();

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur créé avec succès!");
    }


    @Transactional
    @DeleteMapping("/delete_user/{id}")
    public ResponseEntity<String> delete_user(@PathVariable Integer id) {
        try {
            // Supprimer tous les tokens de confirmation associés à cet utilisateur
            confirmationTokenRepository.deleteByUserId(id);

            // Supprimer l'utilisateur
            userRepository.deleteById(id);

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user: " + e.getMessage());
        }
    }
    @GetMapping("/allusers")
    public ResponseEntity<List<User>> get_allusers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
        } else {
            return ResponseEntity.ok(users);
        }
    }
    @DeleteMapping("/blocked/{NameRespense}")
    public ResponseEntity<String> blocked(@PathVariable String email) {
        try {
            int updatedRows = userRepository.blocked(email);
            if (updatedRows > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("User blocked successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to block user: " + e.getMessage());
        }
    }

    @DeleteMapping("/unblocked/{NameRespense}")
    public ResponseEntity<String> deblocked(@PathVariable String email) {
        try {
            int updatedRows = userRepository.enableAppUser(email);
            if (updatedRows > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("User unblocked successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to unblock user: " + e.getMessage());
        }
    }
    @GetMapping("role/{NameRespense}/{role}")
    public ResponseEntity<String> role(@PathVariable String email, @PathVariable String role) {
        Role userRole;
        try {
            userRole = Role.valueOf(role);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role: " + role);
        }

        try {
            int updatedRows = userRepository.mrole(email, userRole);
            if (updatedRows > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("Role updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update role: " + e.getMessage());
        }
    }
}
