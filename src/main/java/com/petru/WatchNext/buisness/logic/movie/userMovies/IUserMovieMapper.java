package com.petru.WatchNext.buisness.logic.movie.userMovies;

import com.petru.WatchNext.test.UserDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

// no usage - please ignore
@Mapper(componentModel = "spring")
public interface IUserMovieMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserDTO dto, @MappingTarget UserMovieEntity entity);
}
