package org.sid.web;
import java.util.List;
import java.util.Optional;

import org.sid.dao.StagiaireRespository;
import org.sid.entities.Stagiaire;
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
public class StagiaireRestService {
	@Autowired
	private StagiaireRespository stagiaireRespository;

	@RequestMapping(value = "/stagiaire", method = RequestMethod.GET)
	public List<Stagiaire> getPersonnes() {
		return stagiaireRespository.findAll();
	}
	@RequestMapping(value = "/stagiaire/{id}", method = RequestMethod.GET)
	public Optional<Stagiaire> getPersonne(@PathVariable Long id) {
		return stagiaireRespository.findById(id);
	}
	@RequestMapping(value = "/stagiaire", method = RequestMethod.POST)
	public Stagiaire SaveContact(@RequestBody Stagiaire c) {
		return stagiaireRespository.save(c);
	}
	@RequestMapping(value = "/stagiaire/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		stagiaireRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/stagiaire/{id}", method = RequestMethod.PUT)
	public Stagiaire modifier(@PathVariable Long id,@RequestBody Stagiaire c) {
		c.setIdS(id);
		return stagiaireRespository.save(c);
	}
	@RequestMapping(value = "/chercherStagiaire", method = RequestMethod.GET)
	public Page<Stagiaire> Chercher(
			@RequestParam(name="mc",defaultValue="") String mc
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		
		return  stagiaireRespository.chercher("%"+mc+"%", new PageRequest(page, size));
	}

	@RequestMapping(value = "/chercherStagiairebyService", method = RequestMethod.GET)
	public Page<Stagiaire> ChercherByService(
			@RequestParam(name="mc",defaultValue="") String mc,
			@RequestParam(name="ser",defaultValue="") String ser
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		
		return  stagiaireRespository.chercherbyService("%" + mc + "%","%" + ser + "%", new PageRequest(page, size));
	}

}
