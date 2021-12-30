package com.petru.WatchNext.buisness.logic.user;

import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import com.petru.WatchNext.buisness.logic.user.role.IUserRoleRepository;
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

        if(iUserDetailsRepository.count() > 1) throw new HttpClientErrorException(HttpStatus.TOO_MANY_REQUESTS); // dummy condition to prevent user multiple user creation
        UserEntity userEntity =new UserEntity();

        userEntity.setUserName(userDetails.getUserName());
        userEntity.setSurname(userDetails.getSurname());
        userEntity.setForename(userDetails.getForename());
        userEntity.setEmail(userDetails.getEmail());
        userEntity.setCreatedOn(new Date());

        userEntity.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        userEntity.setEnabled(true);
        userEntity.setAuthorities(getAuthorities(new String[]{userDetails.getRole()}));

        return iUserDetailsRepository.save(userEntity);
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
