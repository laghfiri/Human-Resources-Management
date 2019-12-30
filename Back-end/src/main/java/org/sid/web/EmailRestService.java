package org.sid.web;

import java.util.List;
import java.util.Optional;

import org.sid.dao.EmailRespository;

import org.sid.entities.Email;
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
public class EmailRestService {

	@Autowired
	private EmailRespository emailRespository;

	@RequestMapping(value = "/email", method = RequestMethod.GET)
	public List<Email> getEmails() {
		return emailRespository.findAll();
	}
	@RequestMapping(value = "/email/{id}", method = RequestMethod.GET)
	public Optional<Email> getEmail(@PathVariable Long id) {
		return emailRespository.findById(id);
	}
	@RequestMapping(value = "/email", method = RequestMethod.POST)
	public Email SaveEmail(@RequestBody Email c) {
		return emailRespository.save(c);
	}
	@RequestMapping(value = "/email/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		emailRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/email/{id}", method = RequestMethod.PUT)
	public Email modifier(@PathVariable Long id,@RequestBody Email c) {
		c.setIdM(id);
		return emailRespository.save(c);
	}
	@RequestMapping(value = "/chercherEmails", method = RequestMethod.GET)
	public Page<Email> ChercherByDate(
			@RequestParam(name="mc",defaultValue="") String mc
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		
		return  emailRespository.chercher("%"+mc+"%", new PageRequest(page, size));
	}

		@RequestMapping(value = "/chercherEmailsByIdR", method = RequestMethod.GET)
	public Page<Email> ChercherByIdR(
			@RequestParam(name="idR",defaultValue="") Long idR
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {	
		return  emailRespository.chercherByIdR(idR, new PageRequest(page, size));
	}
		@RequestMapping(value = "/chercherEmailsByIdE", method = RequestMethod.GET)
	public Page<Email> ChercherByIdE(
			@RequestParam(name="idE",defaultValue="") Long idE
			,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		return  emailRespository.chercherByIdE(idE, new PageRequest(page, size));
	}
		@RequestMapping(value = "/chercherEmailsBySuppr", method = RequestMethod.GET)
		public Page<Email> ChercherBySuppr(
				@RequestParam(name="idE",defaultValue="") Long idE,
				@RequestParam(name="idR",defaultValue="") Long idR
				,@RequestParam(name="page",defaultValue="0") int page
				,@RequestParam(name="size",defaultValue="5") int size) {
			return  emailRespository.chercherBySuppr(idE,idR, new PageRequest(page, size));
		}
		@RequestMapping(value = "/ReturnLu", method = RequestMethod.GET)
		public Long ReturnLu(@RequestParam(name="idE" , defaultValue="")Long idE ) {
			return  emailRespository.countByLu(idE);
		}
}