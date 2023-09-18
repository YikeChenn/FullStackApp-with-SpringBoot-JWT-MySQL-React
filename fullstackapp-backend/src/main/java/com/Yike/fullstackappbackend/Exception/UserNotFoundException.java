package com.Yike.fullstackappbackend.Exception;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(Long id) {
		super("Could not find the user with ID " + id);
	}
}