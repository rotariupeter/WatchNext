package com.petru.WatchNext.test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserLite extends JpaRepository<UserEntityTest, Long> {

    }
