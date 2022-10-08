package com.crystal.ovs.repositories;

import com.crystal.ovs.models.ElectricEngine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectricEngineRepository extends JpaRepository<ElectricEngine, Long> {
}
