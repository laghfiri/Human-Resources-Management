package org.sid.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Justification implements Serializable{
	public Justification(Long idJ, String justification, String fichierUrl) {
		super();
		this.idJ = idJ;
		this.justification = justification;
		this.fichierUrl = fichierUrl;
	}
	@Id @GeneratedValue

	private Long idJ;
	private String justification;
	private String fichierUrl;
	@OneToOne(fetch=FetchType.LAZY,
			cascade=CascadeType.ALL,
			mappedBy="justification")
	private Absence absence;
	
	public Long getIdJ() {
		return idJ;
	}
	public void setIdJ(Long idJ) {
		this.idJ = idJ;
	}
	public String getJustification() {
		return justification;
	}
	public void setJustification(String justification) {
		this.justification = justification;
	}
	public String getFichierUrl() {
		return fichierUrl;
	}
	public void setFichierUrl(String fichierUrl) {
		this.fichierUrl = fichierUrl;
	}

}
