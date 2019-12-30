package org.sid.web;
import java.util.List;
import java.util.Optional;

import org.sid.dao.JustificationRespository;
import org.sid.entities.Justification;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class JustificationRestService {
	@Autowired
	private JustificationRespository justificationRespository;

	@RequestMapping(value = "/justification", method = RequestMethod.GET)
	public List<Justification> getPersonnes() {
		return justificationRespository.findAll();
	}
	@RequestMapping(value = "/justification/{id}", method = RequestMethod.GET)
	public Optional<Justification> getPersonne(@PathVariable Long id) {
		return justificationRespository.findById(id);
	}
	@RequestMapping(value = "/justification", method = RequestMethod.POST)
	public Justification SaveContact(@RequestBody Justification c) {
		return justificationRespository.save(c);
	}
	@RequestMapping(value = "/justification/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		justificationRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/justification/{id}", method = RequestMethod.PUT)
	public Justification modifier(@PathVariable Long id,@RequestBody Justification c) {
		c.setIdJ(id);
		return justificationRespository.save(c);
	}
}
