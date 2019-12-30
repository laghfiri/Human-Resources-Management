package org.sid.web;
import java.util.List;
import java.util.Optional;

import org.sid.dao.VisiteurRespository;
import org.sid.entities.Visiteur;
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
public class VisiteurRestService {
	@Autowired
	private VisiteurRespository visiteurRespository;

	@RequestMapping(value = "/visiteur", method = RequestMethod.GET)
	public List<Visiteur> getPersonnes() {
		return visiteurRespository.findAll();
	}
	@RequestMapping(value = "/visiteur/{id}", method = RequestMethod.GET)
	public Optional<Visiteur> getPersonne(@PathVariable Long id) {
		return visiteurRespository.findById(id);
	}
	@RequestMapping(value = "/visiteur", method = RequestMethod.POST)
	public Visiteur SaveContact(@RequestBody Visiteur c) {
		return visiteurRespository.save(c);
	}
	@RequestMapping(value = "/visiteur/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		visiteurRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/visiteur/{id}", method = RequestMethod.PUT)
	public Visiteur modifier(@PathVariable Long id,@RequestBody Visiteur c) {
		c.setIdV(id);
		return visiteurRespository.save(c);
	}
	@RequestMapping(value = "/chercherVisiteurs", method = RequestMethod.GET)
	public Page<Visiteur> Chercher(
			@RequestParam(name="mc",defaultValue="") String mc
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		
		return  visiteurRespository.chercher("%"+mc+"%", new PageRequest(page, size));
	}
	
}
