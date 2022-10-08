package com.crystal.ovs.repositories;

import com.crystal.ovs.models.Transmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TransmissionRepository extends JpaRepository<Transmission, Long> {
}
