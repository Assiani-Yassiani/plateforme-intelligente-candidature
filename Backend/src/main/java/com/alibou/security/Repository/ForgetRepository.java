package com.alibou.security.Repository;

import com.alibou.security.entities.Forget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgetRepository extends JpaRepository<Forget, Integer> {
 Forget findByEmail(String email);
    void deleteByEmail(String email);

}
