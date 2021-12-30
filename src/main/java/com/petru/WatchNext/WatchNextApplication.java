package com.petru.WatchNext;

import com.petru.WatchNext.buisness.logic.user.UserEntity;
import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import com.petru.WatchNext.buisness.logic.user.IUserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@ComponentScan(basePackages = {"com.petru.WatchNext"})
public class WatchNextApplication {

//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Autowired
	private IUserDetailsRepository IUserDetailsRepository;

	public static void main(String[] args) {

		SpringApplication.run(WatchNextApplication.class, args);
	}

	@PostConstruct
	protected void init() {

		List<AuthRolesEntity> authorityList=new ArrayList<>();

		//authorityList.add(createAuthority("USER","User role"));
		//authorityList.add(createAuthority("ADMIN","Admin role"));

		UserEntity userEntity =new UserEntity();

		userEntity.setUserName("admin1");
		userEntity.setSurname("Rotariu1");
		userEntity.setForename("Petru1");
		userEntity.setEmail("pet1111@yahooo.com");
		userEntity.setCreatedOn(new Date());

		//userEntity.setPassword(passwordEncoder.encode("icws1"));
		userEntity.setEnabled(true);
		userEntity.setAuthorities(authorityList);

		//IUserDetailsRepository.save(userEntity);



	}


	private AuthRolesEntity createAuthority(String roleCode, String roleDescription) {

		AuthRolesEntity authority=new AuthRolesEntity();
		authority.setRoleName(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}

}
