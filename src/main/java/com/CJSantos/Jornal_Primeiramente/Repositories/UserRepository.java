package com.CJSantos.Jornal_Primeiramente.Repositories;

import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import graphql.com.google.common.base.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserModel, String> {
    Optional<UserModel> findByEmail(String email);

    String email(String email);
}
