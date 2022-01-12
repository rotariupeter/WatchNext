package com.petru.WatchNext.buisness.logic.user;

import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import com.petru.WatchNext.buisness.logic.user.role.IUserRoleRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TooManyListenersException;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    IUserDetailsRepository iUserDetailsRepository;

    @Autowired
    IUserRoleRepository iUserRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntityDetails = iUserDetailsRepository.findByUserName(username);
        if(userEntityDetails == null) {
            throw new UsernameNotFoundException("User Not Found with userName "+username);
        }

        return userEntityDetails;
    }

    public UserEntity saveUser(UserInfoDTO userDetails) throws HttpClientErrorException {

        if(iUserDetailsRepository.count() > 100) throw new HttpClientErrorException(HttpStatus.TOO_MANY_REQUESTS,"The user creation is limited to 100. Please contact site administrator"); // dummy condition to prevent user multiple user creation
        UserEntity userEntity =new UserEntity();
        UserEntity savedEntity = null;

        userEntity.setUserName(userDetails.getUserName());
        userEntity.setSurname(userDetails.getSurname());
        userEntity.setForename(userDetails.getForename());
        userEntity.setEmail(userDetails.getEmail());
        userEntity.setCreatedOn(new Date());

        userEntity.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        userEntity.setEnabled(true);
        userEntity.setAuthorities(getAuthorities(new String[]{userDetails.getRole()}));

        try {

            savedEntity= iUserDetailsRepository.save(userEntity);

        } catch (Exception e) {

            e.getLocalizedMessage();
            Throwable cause = e.getCause();
            while (cause.getCause() != null) {
                cause = cause.getCause();
            }
            String message = cause != null ? cause.getMessage().substring(cause.getMessage().lastIndexOf("\n") + 1) : e.getMessage();
            throw new HttpClientErrorException(HttpStatus.CONFLICT,message);
        }

        return savedEntity;
    }

    private List<AuthRolesEntity> getAuthorities(String[] rolesName){

        if (rolesName == null) return null;
        List<AuthRolesEntity> authorityList = new ArrayList<>();
        for (String s : rolesName) {

            switch (s) {
                case "user":
                    authorityList.add(createAuthority("USER", "User role"));
                    break;
                case "admin":
                    authorityList.add(createAuthority("ADMIN", "Admin role"));
                    break;
                case "moderator":
                    authorityList.add(createAuthority("MODERATOR", "Moderator role"));
                    break;
                default:
                    //nothing

            }
        }
        return authorityList;
    }

    private AuthRolesEntity createAuthority(String roleName, String roleDescription) {

        AuthRolesEntity authority = iUserRoleRepository.findFirstByRoleName(roleName);

        if(authority != null) return authority;

        authority=new AuthRolesEntity();
        authority.setRoleName(roleName);
        authority.setRoleDescription(roleDescription);
        return authority;
    }

}
