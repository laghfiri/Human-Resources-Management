package org.sid.dao;

import java.sql.Date;

import org.sid.entities.Presence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PresenceRespository extends JpaRepository<Presence, Long>{
	@Query("select e,p from Presence p,personne e where p.personne_id=e.Matricule")
	public Page<Presence> chercher(Pageable pageable);
	/**
	@Query("select e.nom,e.prenom,e.service,p.datePresence,p.HeureD,p.HeureF from Presence p,personne e where p.personnesP=e.Matricule and p.datePresence = :x")
	public Page<Presence> chercherEmpPres(@Param("x")String date,Pageable pageable); **/
	
	@Query("select e,p from Presence p,personne e where p.personne_id=e.Matricule and p.datePresence like :x")
	public Page<Presence> chercherEmpPres(@Param("x")Date date,Pageable pageable);
	
	@Query("select e,p from Presence p,personne e where p.personne_id= :y and p.datePresence like :x")
	public Page<Presence> chercherEmpPresbyDate(@Param("y")Long matricule, @Param("x")Date date,Pageable pageable);
	
	@Query("select p from Presence p,personne e where p.personne_id= :y and e.Matricule= :z and p.datePresence=:x")
	public Page<Presence> chercherEmpPresbyDateAndMatricule(@Param("y")Long matricule,@Param("z")Long mat, @Param("x")String date,Pageable pageable);
}
