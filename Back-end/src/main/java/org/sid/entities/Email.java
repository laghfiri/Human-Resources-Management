package org.sid.entities;
import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Email implements Serializable {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private long idM;
	private long idE;
	private long  idR;
	private String  subject;
	private String  body; 
	private int  lu;
	private int  supprimer;
	private String  heureE;
	private String  dateE;
	private String  attachement1;
	private String  attachement2;
	// Many Message envoye have a single recepteur
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn (name="idR",referencedColumnName="Matricule",nullable=false,insertable=false,updatable=false)
	private personne recepteur;
	// Many Message recoit have a single emeteur
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn (name="idE",referencedColumnName="Matricule",nullable=false,insertable=false,updatable=false)
	private personne emeteur;
	
	public Email(long idM, long idE, long idR, String subject, String body, int lu, int supprimer, String heureE,
			String dateE, String attachement1, String attachement2, personne recepteur, personne emeteur) {
		super();
		this.idM = idM;
		this.idE = idE;
		this.idR = idR;
		this.subject = subject;
		this.body = body;
		this.lu = lu;
		this.supprimer = supprimer;
		this.heureE = heureE;
		this.dateE = dateE;
		this.attachement1 = attachement1;
		this.attachement2 = attachement2;
		this.recepteur = recepteur;
		this.emeteur = emeteur;
	}

	
	
	public Email() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getIdM() {
		return idM;
	}
	public void setIdM(long idM) {
		this.idM = idM;
	}
	
	public long getIdE() {
		return idE;
	}

	public void setIdE(long idE) {
		this.idE = idE;
	}

	public long getIdR() {
		return idR;
	}

	public void setIdR(long idR) {
		this.idR = idR;
	}

	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public int getLu() {
		return lu;
	}
	public void setLu(int lu) {
		this.lu = lu;
	}
	public int getSupprimer() {
		return supprimer;
	}
	public void setSupprimer(int supprimer) {
		this.supprimer = supprimer;
	}
	public String getHeureE() {
		return heureE;
	}
	public void setHeureE(String heureE) {
		this.heureE = heureE;
	}
	public String getDateE() {
		return dateE;
	}
	public void setDateE(String dateE) {
		this.dateE = dateE;
	}
	public String getAttachement1() {
		return attachement1;
	}
	public void setAttachement1(String attachement1) {
		this.attachement1 = attachement1;
	}
	public String getAttachement2() {
		return attachement2;
	}
	public void setAttachement2(String attachement2) {
		this.attachement2 = attachement2;
	}
	public personne getRecepteur() {
		return recepteur;
	}
	public void setRecepteur(personne recepteur) {
		this.recepteur = recepteur;
	}
	public personne getEmeteur() {
		return emeteur;
	}
	public void setEmeteur(personne emeteur) {
		this.emeteur = emeteur;
	}
	
}
