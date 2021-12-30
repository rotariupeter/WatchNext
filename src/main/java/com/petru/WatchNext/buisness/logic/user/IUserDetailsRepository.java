package com.petru.WatchNext.buisness.logic.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserDetailsRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserName(String userName);

}
