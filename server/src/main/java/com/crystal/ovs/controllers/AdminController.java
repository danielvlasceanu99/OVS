package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoUser;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.AppUser;
import com.crystal.ovs.repositories.AppUserRepository;
import com.crystal.ovs.repositories.RoleRepository;
import com.crystal.ovs.security.config.utils.JwtUtils;
import com.crystal.ovs.services.AppUserService;
import com.crystal.ovs.services.RefreshTokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "api/v1/admin")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    private final AppUserService appUserService;

    private final AppUserRepository appUserRepository;
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @GetMapping
    public List<AppUser> getAllUser() {
        return appUserService.getAllUser();
    }

    @GetMapping(path = "/userID/{id}")
    public AppUser getUserById(@PathVariable Long id) {
        return appUserService.getUserById(id);
    }


    @PostMapping
    public Response<AppUser> insertUser(@RequestBody DtoUser dtoUser,
                                        HttpServletResponse httpResponse) {
        Response<AppUser> response = appUserService.insertUser(dtoUser);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<AppUser> updateUser(@PathVariable Long id,
                                        @RequestBody DtoUser dtoUser,
                                        HttpServletResponse httpResponse) {

        Response<AppUser> response = appUserService.updateUser(id, dtoUser);

        if (response.getErrors().size() > 0) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteUser(@PathVariable Long id) {
        return new Response<>(appUserService.deleteUser(id));
    }
}
