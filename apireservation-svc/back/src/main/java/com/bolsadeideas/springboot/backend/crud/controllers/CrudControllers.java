package com.bolsadeideas.springboot.backend.crud.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.crud.dto.PostDTO;
import com.bolsadeideas.springboot.backend.crud.service.PostManagementService;



@RestController
@RequestMapping("/info")
@CrossOrigin(origins= {"*"})
public class CrudControllers {
	
		@Autowired
		private PostManagementService service;
		
		//Para mostrar la lista
		@GetMapping("/list")
		public ResponseEntity list() {
			return new ResponseEntity (service.list(), HttpStatus.OK);
		}
		
				
		//Para editar
		@PutMapping("/{id}/update")
		public  ResponseEntity edit(@PathVariable(value="id")String id, @RequestBody PostDTO post) {
			
					
			return new ResponseEntity (service.edit(id, post), HttpStatus.OK);
		}
		
		
		
		
}
