package com.bolsadeideas.springboot.backend.crud.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.bolsadeideas.springboot.backend.crud.dto.PostDTO;
import com.bolsadeideas.springboot.backend.crud.firebase.FirebaseInitializer;
import com.bolsadeideas.springboot.backend.crud.service.PostManagementService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Service
public class PostManagementServiceImpl implements PostManagementService{
	
	private String color,marca, tipoBicicleta ;
	//el autowired permite inyectar dependencias o dependencias.
	@Autowired
	private FirebaseInitializer firebase;//Se genera una única instancia del servicio y no múltiples
	
	
	
	@Override
	public List<PostDTO> list() {
		List<PostDTO> response= new ArrayList<>();
		PostDTO post;
		
		ApiFuture<QuerySnapshot> query= collection().get();
		
		try {
			for (QueryDocumentSnapshot doc: query.get().getDocuments()) {
				post= doc.toObject(PostDTO.class);
				post.setId(doc.getId());
				response.add(post);//Vamos llenando el arreglo con la lista
			}
			return response;
		}  catch (Exception e) {
			return null;
		}
		
		
	}

	@Override
	public Boolean edit(String id, PostDTO post) {
		
		List<PostDTO> response= new ArrayList<>();
		PostDTO verif;
		String id2;
		Boolean paso=false;
		
		ApiFuture<QuerySnapshot> query= collection().get();
		
		try {
			for (QueryDocumentSnapshot doc: query.get().getDocuments()) {
				verif= doc.toObject(PostDTO.class);
				verif.setId(doc.getId());
				id2=verif.getId();
				System.out.println(id2);
				response.add(verif);//Vamos llenando el arreglo con la lista
				if (id.equals(id2)) {
					paso=true;
					color=verif.getColor();
					marca=verif.getMarca();
					tipoBicicleta= verif.getTipoBicicleta();
					System.out.println("el color es "+color);
					System.out.println("modelo "+marca);
					System.out.println("tipo "+tipoBicicleta);
					
			}
			}
		}  catch (Exception e) {
			return Boolean.FALSE;
		}
		if(paso) {
			Map<String, Object> docData = getDocData(post);
			ApiFuture<WriteResult> writeResultFuture= collection().document(id).set(docData);
			try {
				
				if (null !=  writeResultFuture.get()) {
					
					return Boolean.TRUE;
				}
				return Boolean.FALSE;
			} catch (Exception e) {
				return Boolean.FALSE;
			}	
		}
		
		return Boolean.FALSE;
			
	}

	
	private CollectionReference collection() {
		return firebase.getFirestore().collection("bicicletas");
	}

	private Map<String, Object> getDocData(PostDTO post) {
		Map<String, Object> docData = new HashMap<>();//Como es una base no relacional se crean documentos, no tablas
		docData.put("color", color);
		docData.put("estado", post.getEstado());
		docData.put("marca", marca);
		docData.put("tipoBicicleta", tipoBicicleta);
		docData.put("usuario", post.getUsuario());
		docData.put("locX", post.getLocX());
		docData.put("locY", post.getLocY());
		return docData;
	}
	
}
