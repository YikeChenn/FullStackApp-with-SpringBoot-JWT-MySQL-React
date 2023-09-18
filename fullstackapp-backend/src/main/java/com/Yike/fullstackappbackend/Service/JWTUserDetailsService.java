package com.Yike.fullstackappbackend.Service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JWTUserDetailsService implements UserDetailsService {

    // Load user details for authentication.
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("yike".equals(username)) {
            return new User("yike", "$2y$10$MpspjHBEECJC043zzfsbC.eVcdef9m6OAyB0i3MbDh4nDgddj5NYO",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

    }

}