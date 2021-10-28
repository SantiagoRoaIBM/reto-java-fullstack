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

	private String usuario, estado, locX, locY;
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
	public Boolean add(PostDTO post) {
		Map<String, Object> docData = getDocData(post);
		
		ApiFuture<WriteResult> writeResultFuture= collection().document().create(docData);
		
		try {
			if (null !=  writeResultFuture.get()) {
				return Boolean.TRUE;
			}
			return Boolean.FALSE;
		} catch (Exception e) {
			
			//e.printStackTrace();
			return Boolean.FALSE;
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
					System.out.println("igual");
					usuario=verif.getUsuario();
					estado= verif.getEstado();
					locX=verif.getLocX();
					locY=verif.getLocY();
				}
			}
		}  catch (Exception e) {
			return Boolean.FALSE;
		}
		
		
		if(paso) {
			Map<String, Object> docData = getDocDataEdit(post);
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

	@Override
	public Boolean delete(String id) {
		
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
				System.out.println(paso);
				response.add(verif);//Vamos llenando el arreglo con la lista
				if (id.equals(id2)) {
					paso=true;
					System.out.println("igual");
					}
			}
		}  catch (Exception e) {
			return Boolean.FALSE;
		}
		if(paso) {
		
		ApiFuture<WriteResult> writeResultFuture= collection().document(id).delete();
		
		try {
			if (null !=  writeResultFuture.get()) {
				return Boolean.TRUE;
			}
			return Boolean.FALSE;
		} catch (Exception e) {
			
			//e.printStackTrace();
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
		docData.put("color", post.getColor());
		docData.put("estado", post.getEstado());
		docData.put("marca", post.getMarca());
		docData.put("tipoBicicleta", post.getTipoBicicleta());
		docData.put("usuario", post.getUsuario());
		docData.put("locX", post.getLocX());
		docData.put("locY", post.getLocY());
		return docData;

	}
	
	private Map<String, Object> getDocDataEdit(PostDTO post) {
		Map<String, Object> docData = new HashMap<>();//Como es una base no relacional se crean documentos, no tablas
		docData.put("color", post.getColor());
		docData.put("estado", estado);
		docData.put("marca", post.getMarca());
		docData.put("tipoBicicleta", post.getTipoBicicleta());
		docData.put("usuario", usuario);
		docData.put("locX", locX);
		docData.put("locY",locY);
		return docData;

	}
	
}
