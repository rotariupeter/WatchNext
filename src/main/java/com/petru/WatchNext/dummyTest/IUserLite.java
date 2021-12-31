package com.petru.WatchNext.dummyTest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserLite extends JpaRepository<UserEntityTest, Long> {

    }
