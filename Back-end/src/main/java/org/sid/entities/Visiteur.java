package org.sid.entities;
import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
@Entity
public class Visiteur  implements Serializable{

	@Id @GeneratedValue(strategy = GenerationType.AUTO)

	private Long idV;
	private String nom;
	private String prenom;
	@Temporal(TemporalType.DATE)
	private Date dateEntree;
	private String cin;
	public Visiteur(Long idV, String nom, String prenom, Date dateEntree, String cin) {
		super();
		this.idV = idV;
		this.nom = nom;
		this.prenom = prenom;
		this.dateEntree = dateEntree;
		this.cin = cin;
	}
	public Visiteur() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdV() {
		return idV;
	}
	public void setIdV(Long idV) {
		this.idV = idV;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public Date getDateEntree() {
		return dateEntree;
	}
	public void setDateEntree(Date dateEntree) {
		this.dateEntree = dateEntree;
	}
	public String getCin() {
		return cin;
	}
	public void setCin(String cin) {
		this.cin = cin;
	}

}
