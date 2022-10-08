package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.AppUser;
import com.crystal.ovs.models.types.AppUserRole;
import com.crystal.ovs.models.RegistrationRequest;
import com.crystal.ovs.models.Role;
import com.crystal.ovs.repositories.AppUserRepository;
import com.crystal.ovs.repositories.RoleRepository;
import com.crystal.ovs.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final AppUserRepository appUserRepository;

    private final RegistrationService registrationService;

    @PostMapping
    public Response<String> register(@RequestBody RegistrationRequest request, HttpServletResponse httpResponse) {
        AppUser user = new AppUser(request.getFirstName(), request.getLastName(), request.getEmail(),
                encoder.encode(request.getPassword()));
        Set<String> strRoles = request.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(AppUserRole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(AppUserRole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;

                    default:
                        Role userRole = roleRepository.findByName(AppUserRole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        appUserRepository.save(user);

        if(registrationService.register(request) != null){
            return new Response<String>("ok");
        } else {
            return new Response<String>("not ok");
        }

    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

}
