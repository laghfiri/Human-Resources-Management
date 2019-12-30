package org.sid.dao;

import java.util.List;

import org.sid.entities.personne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PersonneRespository extends JpaRepository<personne, Long> {
	@Query("select c from personne c where c.nom like :x")
	public Page<personne> chercher(@Param("x") String mc, Pageable pageable);

	@Query("select c from personne c where c.Username like :x")
	public personne chercherByUsername(@Param("x") String username);

	@Query("select c from personne c where c.service like :x")
	public Page<personne> chercherByService(@Param("x") String service, Pageable pageable);

	@Query("select MONTH(c.dateNaissance) as month , count(*) as quantite from personne c where YEAR(c.dateNaissance) like :x  group by MONTH(c.dateNaissance)")
	public List<personne> chercherEmpPresbyDateInscription(@Param("x") int years);

	@Query("select YEAR(c.dateNaissance) as years , count(*) as quantite from personne c group by YEAR(c.dateNaissance)")
	public List<personne> chercherEmpPresbyDate();

}
