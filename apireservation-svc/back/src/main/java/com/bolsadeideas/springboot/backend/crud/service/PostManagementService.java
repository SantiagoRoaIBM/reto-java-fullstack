package com.bolsadeideas.springboot.backend.crud.service;

import java.util.List;

import com.bolsadeideas.springboot.backend.crud.dto.PostDTO;

public interface PostManagementService {

	List<PostDTO> list ();
	
		
	Boolean edit(String id,PostDTO post);

		
	
}
