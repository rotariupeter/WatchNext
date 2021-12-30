package com.petru.WatchNext.buisness.logic.user.role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRoleRepository extends JpaRepository<AuthRolesEntity, Long> {

    AuthRolesEntity findFirstByRoleName(String roleName);
}
