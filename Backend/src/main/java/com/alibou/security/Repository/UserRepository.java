package com.alibou.security.Repository;

import java.util.Optional;

import com.alibou.security.role.Role;
import com.alibou.security.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
  Optional<User> findById(Integer id);

  @Transactional
  @Modifying
  @Query("UPDATE User a SET a.role = :role WHERE a.email = :email")
  int mrole(@Param("email") String email, @Param("role") Role role);

  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.verified = TRUE WHERE u.email = ?1")
  int enableAppUser(String email);

  @Transactional
  @Modifying
  @Query("UPDATE User a SET a.verified = FALSE WHERE a.email= ?1")
  int blocked(String email);
}
