package com.bolsadeideas.springboot.backend.crud.dto;

import java.io.Serializable;

public class PostDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String marca;
	private String tipoBicicleta;
	private String color;
	private String estado;
	private String usuario;
	private String locX;
	private String locY;


	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}
	public String getTipoBicicleta() {
		return tipoBicicleta;
	}
	public void setTipoBicicleta(String tipoBicicleta) {
		this.tipoBicicleta = tipoBicicleta;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getLocX() {
		return locX;
	}
	public void setLocX(String locX) {
		this.locX = locX;
	}
	public String getLocY() {
		return locY;
	}
	public void setLocY(String locY) {
		this.locY = locY;
	}
	
	
}	
