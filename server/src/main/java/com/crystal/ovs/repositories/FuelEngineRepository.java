package com.crystal.ovs.repositories;

import com.crystal.ovs.models.FuelEngine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuelEngineRepository extends JpaRepository<FuelEngine, Long> {
}
