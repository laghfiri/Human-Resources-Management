package org.sid.dao;

import java.sql.Date;

import org.sid.entities.Conge;
import org.sid.entities.personne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CongeRespository extends JpaRepository<Conge, Long> {
	@Query("select c from Conge c where c.personne_id=:x")
	public Page<Conge> CongesByPersonne(@Param("x")Long id,Pageable pageable);
	@Query("SELECT count(*) FROM Conge c,personne p WHERE status=2 "
			+ "AND (:x between c.dateDebut and c.dateFin OR :z between c.dateDebut and c.dateFin) "
			+ "AND c.personne_id=p.Matricule AND p.service like :y")
	public int VerifiConge(@Param("x") Date dated,@Param("z") Date datef,@Param("y")String service);
	@Query("select c,p from Conge c,personne p where c.personne_id=p.Matricule")
	public Page<Conge> GetConges(Pageable pageable);
	@Query("select c from Conge c where :x BETWEEN dateDebut and dateFin")
	public List<Conge> CongeInclutInDate(@Param("x") Date date);

}
