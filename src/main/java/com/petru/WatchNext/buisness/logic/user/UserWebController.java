package com.petru.WatchNext.buisness.logic.user;

import com.petru.WatchNext.buisness.logic.security.JWT.JWTTokenHelper;
import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")

public class UserWebController {

    @Autowired
    private CustomUserService userDetailsService;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserInfoDTO userDetails)  {

        if (userDetails == null || userDetails.getUserName() == null || userDetails.getPassword() == null)
            return ResponseEntity.noContent().build();

        userDetailsService.saveUser(userDetails);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user){
        UserEntity userEntityObj =(UserEntity) userDetailsService.loadUserByUsername(user.getName());

        UserInfoDTO userInfo=new UserInfoDTO();
        userInfo.setSurname(userEntityObj.getSurename());
        userInfo.setForename(userEntityObj.getForename());
        userInfo.setRoles(userEntityObj.getAuthorities().toArray());

        return ResponseEntity.ok(userInfo);

    }

}
