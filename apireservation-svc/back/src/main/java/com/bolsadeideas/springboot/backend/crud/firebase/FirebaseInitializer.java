package com.bolsadeideas.springboot.backend.crud.firebase;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

//Agregamos etiqueta service para que se ejecute apenas se levante
@Service
public class FirebaseInitializer {
	
	@PostConstruct
	private void iniStore() throws IOException {

		//Se usará el getClass en vez de la ruta que da firebase directamente para que lea rutas relativas
		InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("crud-bicicletas-firebase-key.json");
		
		
		FirebaseOptions options = new FirebaseOptions.Builder()
		  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
		  .setDatabaseUrl("https://crud-bicicletas.firebaseio.com/")//URL de la base de datos
		  .build();
		
		if(FirebaseApp.getApps().isEmpty()) {
			FirebaseApp.initializeApp(options);
		}
	}
	
	public Firestore getFirestore() {
		return FirestoreClient.getFirestore();
	}
}
