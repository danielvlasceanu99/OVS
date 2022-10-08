package com.crystal.ovs.services;

import com.crystal.ovs.models.types.AppUserRole;
import com.crystal.ovs.models.Role;
import com.crystal.ovs.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRole(String name) {
        return roleRepository.findByName(AppUserRole.valueOf(name));
    }
}
