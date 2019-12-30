package org.sid.dao;

import org.sid.entities.Email;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmailRespository extends JpaRepository<Email, Long> {
	@Query("select e from Email e where e.dateE like :x")
	public Page<Email> chercher(@Param("x")String mc,Pageable pageable);
	@Query("select e from Email e where e.idR = :x and e.supprimer=0 ORDER BY e.dateE DESC, e.heureE DESC")
	public Page<Email> chercherByIdR(@Param("x")Long idR,Pageable pageable);
	@Query("select e from Email e where e.idE = :x and e.supprimer=0 ORDER BY e.dateE DESC, e.heureE DESC")
	public Page<Email> chercherByIdE(@Param("x")Long idE,Pageable pageable);	
	@Query("select e from Email e where e.supprimer=1 and ( e.idR = :x or e.idE= :y ) ORDER BY e.dateE DESC, e.heureE DESC")
	public Page<Email> chercherBySuppr(@Param("x")Long idE,@Param("y")Long idR,Pageable pageable);
	@Query("select COUNT(e) as notif from Email e where e.idR=:x and e.supprimer=0 and e.lu =0")
	public Long countByLu(@Param("x")Long idE);
}
 