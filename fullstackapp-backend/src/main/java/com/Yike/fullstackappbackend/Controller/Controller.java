package com.Yike.fullstackappbackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Yike.fullstackappbackend.Exception.UserNotFoundException;
import com.Yike.fullstackappbackend.Model.User;
import com.Yike.fullstackappbackend.Repository.UserRepository;

@RestController
public class Controller {
	@Autowired
	private UserRepository userRepository;
	
	// Create new user
	@PostMapping("/user")
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}
	
	// Get all existed user
	@GetMapping("/user")
	List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	// Get user by ID
	@GetMapping("/user/{id}")
	User getUserById(@PathVariable Long id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
	}
	
	// Edit user
	@PutMapping("/user/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return userRepository.findById(id).map(user -> {
			user.setName(newUser.getName());
			user.setUserName(newUser.getUserName());
			user.setEmail(newUser.getEmail());
			return userRepository.save(user);
		}).orElseThrow(() -> new UserNotFoundException(id));
	}
	
	// Delete user
	@DeleteMapping("/user/{id}")
	void deleteUser(@PathVariable Long id) {
		if(!userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
	}
}
