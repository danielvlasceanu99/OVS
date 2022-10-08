package com.crystal.ovs.repositories;

import com.crystal.ovs.models.types.AppUserRole;
import com.crystal.ovs.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(AppUserRole name);

}