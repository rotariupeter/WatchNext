package com.petru.WatchNext.dummyTest;

import com.petru.WatchNext.buisness.logic.user.role.AuthRolesEntity;
import com.petru.WatchNext.buisness.logic.user.role.IUserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMoviesLiteService1 {


    @Autowired
    IUserRoleRepository roleRep;

    @Autowired
    IUserLite userRepo;

    @Autowired
    IUserMapper userMapper;

    public void updateCustomer(UserDTO dto) {
        UserEntityTest myUser = userRepo.findById(dto.getId()).get();
        userMapper.updateUserFromDto(dto, myUser);
        userRepo.save(myUser);
    }

    public AuthRolesEntity getRoleById(long id){

        return roleRep.getById(id);
    }

    public UserEntityTest getUserByid(Long id) {
       return userRepo.getById(id);
    }

    public UserEntityTest getSave(UserEntityTest user)
    {
        return userRepo.save(user);
    }
}
