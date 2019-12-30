package org.sid.entities;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.ManyToOne;
@Entity
public class Conge implements Serializable {
@Id @GeneratedValue
private Long idC;
private String status;
private Long personne_id;
private String type;
@Temporal(TemporalType.DATE)
private Date dateDebut;
@Temporal(TemporalType.DATE)
private Date dateFin;
private String description;
private String attachement;
private String dure;
public String getDure() {
	return dure;
}

public void setDure(String dure) {
	this.dure = dure;
}

public String getAttachement() {
	return attachement;
}

public void setAttachement(String attachement) {
	this.attachement = attachement;
}
// Many conge have a single employe
@ManyToOne(fetch=FetchType.LAZY)
@JoinColumn (name="personne_id",referencedColumnName="Matricule",nullable=false,insertable=false,updatable=false)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,property="Matricule")
private personne Mpersonnes;
public Conge() {
	super();
	// TODO Auto-generated constructor stub
}



public Conge(Long idC, String status, String type, Date dateDebut, Date dateFin, String description, String attachement) {
	super();
	this.idC = idC;
	this.status = status;
	this.type = type;
	this.dateDebut = dateDebut;
	this.dateFin = dateFin;
	this.description = description;
	this.attachement = attachement;
}

public Long getIdC() {
	return idC;
}
public void setIdC(Long idC) {
	this.idC = idC;
}
public Long getPersonne_id() {
	return personne_id;
}

public void setPersonne_id(Long personne_id) {
	this.personne_id = personne_id;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public Date getDateDebut() {
	return dateDebut;
}
public void setDateDebut(Date dateDebut) {
	this.dateDebut = dateDebut;
}
public Date getDateFin() {
	return dateFin;
}
public void setDateFin(Date dateFin) {
	this.dateFin = dateFin;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

}
