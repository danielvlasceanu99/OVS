package com.crystal.ovs.repositories;

import com.crystal.ovs.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value = "SELECT * FROM Transaction t WHERE t.user_id = ?1", nativeQuery = true)
    List<Transaction> getTransactionByUserId(Long id);
}
