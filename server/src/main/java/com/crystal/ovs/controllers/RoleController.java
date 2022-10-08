package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoRole;
import com.crystal.ovs.models.Role;
import com.crystal.ovs.services.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/add")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:4200")
public class RoleController {

    private final RoleService roleService;


    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        ResponseEntity<List<Role>> body = ResponseEntity.status(HttpStatus.CREATED).body(roleService.getRoles());

        if (body.getStatusCode().equals(HttpStatus.OK)) {
            log.info("Roles have been getted!");
        }

        return body;
    }
}
