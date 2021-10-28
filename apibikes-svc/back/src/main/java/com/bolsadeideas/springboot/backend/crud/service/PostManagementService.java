package com.bolsadeideas.springboot.backend.crud.service;

import java.util.List;

import com.bolsadeideas.springboot.backend.crud.dto.PostDTO;

public interface PostManagementService {

	List<PostDTO> list ();
	
	Boolean add(PostDTO post);
	
	Boolean edit(String id,PostDTO post);

	Boolean delete(String id);
	
	
	
}
