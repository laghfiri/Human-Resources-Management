package org.sid.dao;

import java.sql.Date;
import java.util.List;

import org.sid.entities.Absence;
import org.sid.entities.Conge;
import org.sid.entities.personne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AbsenceRespository extends JpaRepository<Absence, Long> {
	//@Query("select c from absence c where c.datePresence = :x")
	//public Page<Absence> chercher(@Param("x")String mc,Pageable pageable);
	@Query("select count(*) from Absence where dateAbsence= :x")
	public int VerfierAbsenceDate(@Param("x")Date date); 
	@Modifying
	@Query(value="Insert into Absence ( dateAbsence,personne_id) " + 
			"SELECT   :x,Matricule FROM personne where "
			+ "Matricule not in (select personne_id   from Presence where datePresence= :x) ",nativeQuery=true)
	public void AbsenceFromPresence(@Param("x")Date date);
	@Query("SELECT p FROM personne p where "+ 
			"p.Matricule not in (select personne_id   from Presence where datePresence= :x) ") 
	public List<personne> getAbsence(@Param("x")Date date);
	@Query("SELECT   count(*) FROM personne where "
			+ "Matricule not in (select personne_id   from Presence where datePresence= :x) ")
	public int NumberAbsence(@Param("x")Date date);
	@Query("Select a from Absence a where personne_id=:x")
	public List<Absence> ListAbsence(@Param("x")Long id);
	@Query("select c from Conge c where :x BETWEEN dateDebut and dateFin")
	public List<Conge> CongeInclutInDate(@Param("x") Date date);
}
