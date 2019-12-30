package org.sid.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity
public class personne implements Serializable{
@Id @GeneratedValue

	private Long Matricule;
	private String nom;
	private String prenom;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String email;
	private long tele;
	private String photo;
	private String cin;
	private String lieuNaissance;
	private String sexe;
	private String service;
	private String dateDeb;
	private String dateFin;
	private String Adresse;
	private String ville;
	private String Username;
	private String accesMod;
	public String getAccesMod() {
		return accesMod;
	}

	public void setAccesMod(String accesMod) {
		this.accesMod = accesMod;
	}
	private String Password;
	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}
	@OneToMany(mappedBy="Mpersonnes",
					cascade=CascadeType.ALL,
					fetch=FetchType.LAZY
							)
@JsonIgnore

	private Collection<Conge> conges;
	@OneToMany(mappedBy="recepteur",
			cascade=CascadeType.ALL,
			fetch=FetchType.LAZY
					)
	@JsonIgnore

private Collection<Email> emailR;
	public Collection<Conge> getConges() {
		return conges;
	}

	public void setConges(Collection<Conge> conges) {
		this.conges = conges;
	}

	public Collection<Email> getEmailR() {
		return emailR;
	}

	public void setEmailR(Collection<Email> emailR) {
		this.emailR = emailR;
	}

	public Collection<Email> getEmailE() {
		return emailE;
	}

	public void setEmailE(Collection<Email> emailE) {
		this.emailE = emailE;
	}

	public Collection<Presence> getPresences() {
		return presences;
	}

	public void setPresences(Collection<Presence> presences) {
		this.presences = presences;
	}

	public Collection<Absence> getAbcences() {
		return abcences;
	}

	public void setAbcences(Collection<Absence> abcences) {
		this.abcences = abcences;
	}
	@OneToMany(mappedBy="emeteur",
			cascade=CascadeType.ALL,
			fetch=FetchType.LAZY
					)
	@JsonIgnore

private Collection<Email> emailE;
	@OneToMany(mappedBy="personneP",
			cascade=CascadeType.ALL,
			fetch=FetchType.LAZY
					)
	@JsonIgnore

private Collection<Presence> presences;
	@OneToMany(mappedBy="personnesA",
			cascade=CascadeType.ALL,
			fetch=FetchType.LAZY
					)
	@JsonIgnore

private Collection<Absence> abcences;
	public String getVille() {

		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}
	private String niveauEtude;
	
	public personne( String nom, String prenom, Date dateNaissance, String email, long tele,
			String photo, String cin, String lieuNaissance, String sexe, String service, String dateDeb, String adresse,
			String niveauEtude) {
		super();
		
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.email = email;
		this.tele = tele;
		this.photo = photo;
		this.cin = cin;
		this.lieuNaissance = lieuNaissance;
		this.sexe = sexe;
		this.service = service;
		this.dateDeb = dateDeb;
		Adresse = adresse;
		this.niveauEtude = niveauEtude;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getLieuNaissance() {
		return lieuNaissance;
	}

	public void setLieuNaissance(String lieuNaissance) {
		this.lieuNaissance = lieuNaissance;
	}

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getDateDeb() {
		return dateDeb;
	}

	public void setDateDeb(String dateDeb) {
		this.dateDeb = dateDeb;
	}

	public String getAdresse() {
		return Adresse;
	}

	public void setAdresse(String adresse) {
		Adresse = adresse;
	}

	public String getNiveauEtude() {
		return niveauEtude;
	}

	public void setNiveauEtude(String niveauEtude) {
		this.niveauEtude = niveauEtude;
	}

	public personne() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Long getMatricule() {
		return Matricule;
	}

	public void setMatricule(Long matricule) {
		Matricule = matricule;
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
	public Date getDateNaissance() {
		return dateNaissance;
	}
	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getTele() {
		return tele;
	}
	public void setTele(long tele) {
		this.tele = tele;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
}

