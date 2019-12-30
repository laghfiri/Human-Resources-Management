package org.sid.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
@Entity
public class Absence implements Serializable{
	@Id @GeneratedValue

	private Long idA;
	private Long personne_id;

	private Date dateAbsence;
	public Long getPersonne_id() {
		return personne_id;
	}
	public void setPersonne_id(Long personne_id) {
		this.personne_id = personne_id;
	}
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn (name="personne_id",referencedColumnName="Matricule",nullable=false,insertable=false,updatable=false)
	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,property="Matricule")
	private personne personnesA;
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_justification",referencedColumnName="idJ",insertable=false,updatable=false)
	private Justification justification;
	
	public Absence(Long idA, Date dateAbsence) {
		super();
		this.idA = idA;
		this.dateAbsence = dateAbsence;
	
	}
	public Absence() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdA() {
		return idA;
	}
	public void setIdA(Long idA) {
		this.idA = idA;
	}
	public Date getDateAbsence() {
		return dateAbsence;
	}
	public void setDateAbsence(Date dateAbsence) {
		this.dateAbsence = dateAbsence;
	}
	

}
