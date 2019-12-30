package org.sid.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Stagiaire implements Serializable {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private Long idS;
	private String nom;
	private String prenom;
	private String service;
	private String CV;
	private String demandeStage;
	private int etatDemande;
	public Stagiaire(Long idS, String nom, String prenom, String service, String CV,String demandeStage, int etatDemande) {
		super();
		this.idS = idS;
		this.nom = nom;
		this.prenom = prenom;
		this.service = service;
		this.CV = CV;
		this.demandeStage = demandeStage;
		this.etatDemande = etatDemande;
	}
	public Stagiaire() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdS() {
		return idS;
	}
	public void setIdS(Long idS) {
		this.idS = idS;
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
	public String getService() {
		return service;
	}
	public void setService(String service) {
		this.service = service;
	}
	public String getCV() {
		return CV;
	}
	public void setCV(String CV) {
		this.CV = CV;
	}
	
	public String getDemandeStage() {
		return demandeStage;
	}
	public void setDemandeStage(String demandeStage) {
		this.demandeStage = demandeStage;
	}
	public int getEtatDemande() {
		return etatDemande;
	}
	public void setEtatDemande(int etatDemande) {
		this.etatDemande = etatDemande;
	}	
}
