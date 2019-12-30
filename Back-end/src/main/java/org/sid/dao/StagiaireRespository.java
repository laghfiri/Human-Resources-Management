package org.sid.dao;

import org.sid.entities.Stagiaire;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StagiaireRespository extends JpaRepository<Stagiaire, Long>{
	@Query("select s from Stagiaire s where s.nom like :x")
	public Page<Stagiaire> chercher(@Param("x")String mc,Pageable pageable);
	@Query("select s from Stagiaire s where s.nom like :x and s.service like :y")
	public Page<Stagiaire> chercherbyService(@Param("x")String mc,@Param("y")String ser,Pageable pageable);
}
