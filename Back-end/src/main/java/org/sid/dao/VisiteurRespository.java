package org.sid.dao;
import org.sid.entities.Visiteur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface VisiteurRespository extends JpaRepository<Visiteur, Long>{
	@Query("select v from Visiteur v where v.nom like :x")
	public Page<Visiteur> chercher(@Param("x")String mc,Pageable pageable);

}
