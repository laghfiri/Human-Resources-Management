package org.sid.entities;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
@Entity
public class Presence implements Serializable{
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private Long idP;
	private Long personne_id;
	private Date datePresence;
	private String HeureDpre;
	private String HeureFpre;
	private String HeureDdeu;
	private String HeureFdeu;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn (name="personne_id",referencedColumnName="Matricule",nullable=false,insertable=false,updatable=false)
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,property="Matricule")
	private personne personneP;
	
	public Presence(Long idP, Long personne_id, Date datePresence, String heureDpre, String heureFpre,
			String heureDdeu, String heureFdeu, personne personneP) {
		super();
		this.idP = idP;
		this.personne_id = personne_id;
		this.datePresence = datePresence;
		HeureDpre = heureDpre;
		HeureFpre = heureFpre;
		HeureDdeu = heureDdeu;
		HeureFdeu = heureFdeu;
		this.personneP = personneP;
	}
	public Presence() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdP() {
		return idP;
	}
	public void setIdP(Long idP) {
		this.idP = idP;
	}
	public Date getDatePresence() {
		return datePresence;
	}
	public void setDatePresence(Date datePresence) {
		this.datePresence = datePresence;
	}
	public String getHeureDpre() {
		return HeureDpre;
	}
	public void setHeureDpre(String heureDpre) {
		HeureDpre = heureDpre;
	}
	public String getHeureFpre() {
		return HeureFpre;
	}
	public void setHeureFpre(String heureFpre) {
		HeureFpre = heureFpre;
	}
	public String getHeureDdeu() {
		return HeureDdeu;
	}
	public void setHeureDdeu(String heureDdeu) {
		HeureDdeu = heureDdeu;
	}
	public String getHeureFdeu() {
		return HeureFdeu;
	}
	public void setHeureFdeu(String heureFdeu) {
		HeureFdeu = heureFdeu;
	}
	public Long getPersonne_id() {
		return personne_id;
	}
	public void setPersonne_id(Long personne_id) {
		this.personne_id = personne_id;
	}
	

}
