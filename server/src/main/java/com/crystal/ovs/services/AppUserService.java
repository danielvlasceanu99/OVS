package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoUser;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.UserNotFoundException;
import com.crystal.ovs.models.AppUser;
import com.crystal.ovs.models.ConfirmationToken;
import com.crystal.ovs.models.Role;
import com.crystal.ovs.models.UserDetailsImpl;
import com.crystal.ovs.models.types.AppUserRole;
import com.crystal.ovs.repositories.AppUserRepository;
import com.crystal.ovs.repositories.ConfirmationTokenRepository;
import com.crystal.ovs.repositories.RoleRepository;
import com.crystal.ovs.services.util.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";
    private final RoleService roleService;
    private final EmailValidator emailValidator;
    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    public static final String USER = "USER";


    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final ConfirmationTokenRepository confirmationTokenRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

        return UserDetailsImpl.build(user);
    }


    public String signUpUser(AppUser appUser) {

        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {

            AppUser appUserPrevious = appUserRepository.findByEmail(appUser.getEmail()).get();
            Boolean isEnabled = appUserPrevious.getEnabled();

            if (!isEnabled) {
                String token = UUID.randomUUID().toString();

                //A method to save user and token in this class
                saveConfirmationToken(appUserPrevious, token);

                return token;

            }
            throw new IllegalStateException(String.format("User with email %s already exists!", appUser.getEmail()));
        }


        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);


        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(25),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);


        return token;
    }

    private void saveConfirmationToken(AppUser appUser, String token) {
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15), appUser);
        confirmationTokenService.saveConfirmationToken(confirmationToken);
    }


    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public AppUser getUserById(Long id) {
        return appUserRepository
                .findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    public Response<AppUser> insertUser(DtoUser dtoUser) {
        boolean isValidEmail = emailValidator.
                test(dtoUser.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }
        Response<AppUser> response = new Response<>();
        response.setErrors(validate(dtoUser));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(AppUserRole.ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        if (response.getErrors().size() == 0) {
            AppUser user1 = new AppUser();
            user1.setFields(dtoUser);
            user1.setRoles(roles);
            user1.setFirstName("Admin");
            user1.setLastName("Admin");
            response.setResponseBody(appUserRepository.save(user1));
            String encodedPassword = bCryptPasswordEncoder.encode(user1.getPassword());
            user1.setPassword(encodedPassword);
            appUserRepository.save(user1);
        }


        return response;
    }

    @Transactional
    public Response<AppUser> updateUser(Long id, DtoUser dtoUser) {
        Response<AppUser> response = new Response<>();
        response.setErrors(validate(dtoUser));

        AppUser user = appUserRepository
                .findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (response.getErrors().size() == 0) {
            user.setFields(dtoUser);
            response.setResponseBody(user);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        appUserRepository.save(user);
        return response;
    }

    public String deleteUser(Long id) {
        if (!appUserRepository.existsById(id)) {
            throw new UserNotFoundException();
        }

        appUserRepository.deleteById(id);
        return "User removed";
    }

    public List<AppUser> getAllUser() {
        return this.appUserRepository.findAll();
    }

    public Optional findUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public Optional findUserByResetToken(String resetToken) {
        return appUserRepository.findByResetToken(resetToken);
    }


    public void saveUser(AppUser appUser) {
        appUserRepository.save(appUser);
    }


    private List<String> validate(DtoUser dtoUser) {
        List<String> validationErrors = new ArrayList<>();


        if (dtoUser.getEmail() == null) {
            validationErrors.add("ERROR: Email can't be empty");
        }
        if (dtoUser.getEnabled() == null) {
            validationErrors.add("ERROR: Enabled can't be empty");
        }

        if (dtoUser.getLocked() == null) {
            validationErrors.add("ERROR: Locked can't be empty");
        }
        if (dtoUser.getPassword() == null) {
            validationErrors.add("ERROR: Password can't be empty");
        }
        return validationErrors;
    }
}
