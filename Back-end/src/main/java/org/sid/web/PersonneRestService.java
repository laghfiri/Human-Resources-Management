
package org.sid.web;

import java.util.List;
import java.util.Optional;

import org.sid.dao.PersonneRespository;
import org.sid.entities.personne;
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
public class PersonneRestService {
	@Autowired
	private PersonneRespository PersonneRespository;

	@RequestMapping(value = "/personne", method = RequestMethod.GET)
	public List<personne> getPersonnes() {
		return PersonneRespository.findAll();
	}

	@RequestMapping(value = "/personne/{id}", method = RequestMethod.GET)
	public Optional<personne> getPersonne(@PathVariable Long id) {
		return PersonneRespository.findById(id);
	}

	@RequestMapping(value = "/personne", method = RequestMethod.POST)
	public personne SaveContact(@RequestBody personne c) {
		return PersonneRespository.save(c);
	}

	@RequestMapping(value = "/personne/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		PersonneRespository.deleteById(id);
		return true;
	}

	@RequestMapping(value = "/personne/{id}", method = RequestMethod.PUT)
	public personne modifier(@PathVariable Long id, @RequestBody personne c) {
		c.setMatricule(id);
		return PersonneRespository.save(c);
	}

	@RequestMapping(value = "/chercherPersonnes", method = RequestMethod.GET)
	public Page<personne> Chercher(@RequestParam(name = "mc", defaultValue = "") String mc,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "5") int size) {

		return PersonneRespository.chercher("%" + mc + "%", new PageRequest(page, size));
	}

	@RequestMapping(value = "/chercherParUsername", method = RequestMethod.GET)
	public personne ChercherByUsername(@RequestParam(name = "username") String username) {
		return PersonneRespository.chercherByUsername(username);
	}

	@RequestMapping(value = "/chercherParService", method = RequestMethod.GET)
	public Page<personne> ChercherByService(@RequestParam(name = "service", defaultValue = "") String service,

			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "5") int size) {

		return PersonneRespository.chercherByService("%" + service + "%", new PageRequest(page, size));
	}

	@RequestMapping(value = "/getAllListStaticsByYearsAndMonth", method = RequestMethod.POST)
	public List<personne> chercherEmpPresbyDateInscription(@RequestParam(name = "years", defaultValue = "") int years) {
		System.out.println("THIS IS THE YEAR : " + years);
		return PersonneRespository.chercherEmpPresbyDateInscription(years);
	}

	@RequestMapping(value = "/getAllListStaticsByYears", method = RequestMethod.POST)
	public List<personne> chercherEmpPresbyDate() {
		System.out.println("ALL YEARS");
		return PersonneRespository.chercherEmpPresbyDate();
	}

}
