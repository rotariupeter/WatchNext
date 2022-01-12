package com.petru.WatchNext.buisness.logic.security;

import com.petru.WatchNext.buisness.logic.security.JWT.JWTTokenHelper;
import com.petru.WatchNext.buisness.logic.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthWebController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/auth/login")
    public synchronized ResponseEntity<?> login( @RequestBody UserAuthRequestDTO authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException, InterruptedException {

        Thread.sleep(1100);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUserName(), authenticationRequest.getPassword(),new ArrayList<>()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserEntity userEntity =(UserEntity) authentication.getPrincipal();
        String jwtToken=jWTTokenHelper.generateToken(userEntity.getUsername());

        UserLoginResponseDTO response=new UserLoginResponseDTO();
        response.setToken(jwtToken);
        response.setName(userEntity.getForename() + " "+ userEntity.getSurename());
        response.setUsername(userEntity.getUsername());
        response.setUser_id(userEntity.getId());
        response.setExpirationDate(jWTTokenHelper.getExpirationDate(jwtToken));


        return ResponseEntity.ok(response);
    }
}
