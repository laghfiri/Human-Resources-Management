package org.sid.web;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.sid.dao.PresenceRespository;
import org.sid.entities.Presence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class PresenceRestService {
	@Autowired
	private PresenceRespository presenceRespository;

	@RequestMapping(value = "/presence", method = RequestMethod.GET)
	public List<Presence> getPersonnes() {
		return presenceRespository.findAll();
	}
	@RequestMapping(value = "/presence/{id}", method = RequestMethod.GET)
	public Optional<Presence> getPersonne(@PathVariable Long id) {
		return presenceRespository.findById(id);
	}
	@RequestMapping(value = "/presence", method = RequestMethod.POST)
	public Presence SaveContact(@RequestBody Presence c) {
		return presenceRespository.save(c);
	}
	@RequestMapping(value = "/presence/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		presenceRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/presence/{id}", method = RequestMethod.PUT)
	public Presence modifier(@PathVariable Long id,@RequestBody Presence c) {
		c.setIdP(id);
		return presenceRespository.save(c);
	}
	@RequestMapping(value = "/chercherPresences", method = RequestMethod.GET)
	public Page<Presence> Chercher(
			@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		
		return  presenceRespository.chercher( new PageRequest(page, size));
	}
	@RequestMapping(value = "/chercherPresencesEmp", method = RequestMethod.GET)
	public Page<Presence> ChercherP(
			@RequestParam(name="date",defaultValue="") Date date,
			@RequestParam(name="page",defaultValue="0") int page,
			@RequestParam(name="size",defaultValue="5") int size) {
		
		return  presenceRespository.chercherEmpPres(date, new PageRequest(page, size));
	}
	@RequestMapping(value = "/chercherPresencesEmpbyMat", method = RequestMethod.GET)
	public Page<Presence> ChercherPByDate(
			@RequestParam(name="mat",defaultValue="") Long mat,
			@RequestParam(name="date",defaultValue="") Date date,
			@RequestParam(name="page",defaultValue="0") int page,
			@RequestParam(name="size",defaultValue="5") int size) {
		
		return  presenceRespository.chercherEmpPresbyDate(mat,date, new PageRequest(page, size));
	}
	@RequestMapping(value = "/chercherPresencesEmpbyMatAndDate", method = RequestMethod.GET)
	public Page<Presence> ChercherPByDateAndMat(
			@RequestParam(name="mat",defaultValue="") Long mat,
			@RequestParam(name="date",defaultValue="") String date,
			@RequestParam(name="page",defaultValue="0") int page,
			@RequestParam(name="size",defaultValue="5") int size) {
		
		return  presenceRespository.chercherEmpPresbyDateAndMatricule(mat,mat,date, new PageRequest(page, size));
	}
	
}
