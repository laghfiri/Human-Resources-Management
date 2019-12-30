package org.sid.web;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import org.sid.dao.CongeRespository;
import org.sid.entities.Conge;
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
public class CongeRestService {
	@Autowired
	private CongeRespository congeRespository;

	@RequestMapping(value = "/conge", method = RequestMethod.GET)
	public List<Conge> getPersonnes() {
		return congeRespository.findAll();
	}
	@RequestMapping(value = "/conge/{id}", method = RequestMethod.GET)
	public Optional<Conge> getPersonne(@PathVariable Long id) {
		return congeRespository.findById(id);
	}
	@RequestMapping(value = "/conge", method = RequestMethod.POST)
	public Conge SaveContact(@RequestBody Conge c) {
		return congeRespository.save(c);
	}
	@RequestMapping(value = "/conge/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		congeRespository.deleteById(id);
		return true;
	}
	@RequestMapping(value = "/conge/{id}", method = RequestMethod.PUT)
	public Conge modifier(@PathVariable Long id,@RequestBody Conge c) {
		c.setIdC(id);
		return congeRespository.save(c);
	}
	@RequestMapping(value = "/Conges", method = RequestMethod.GET)
	public Page<Conge> GetConges(
			@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="5") int size) {
		return  congeRespository.GetConges(new PageRequest(page, size));
	}
	@RequestMapping(value = "/CongesByPersonne", method = RequestMethod.GET)
	public Page<Conge> CongesByPersonne(
			@RequestParam(name="id") Long id,@RequestParam(name="page",defaultValue="0") int page
			,@RequestParam(name="size",defaultValue="6") int size) {
		return  congeRespository.CongesByPersonne(id, new PageRequest(page, size));
	}
	@RequestMapping(value="/VerfieConge",method=RequestMethod.GET)
	public boolean VerifieConge(@RequestParam(name="dateD") Date dated,@RequestParam(name="dateF") Date datef,@RequestParam(name="service") String Service) {
		int result=congeRespository.VerifiConge(dated,datef,"%"+Service+"%");
		
		System.out.println("nombre est "+result+" date debut "+ dated+" date fin "+datef+"  service "+Service);
		if(result>=1) return false;
		else return true;
	}
	
	@RequestMapping(value = "/CongesBetween", method = RequestMethod.GET)
	public List<Conge> CongesByPersonne( @RequestParam(name="date") Date date) {
		return  congeRespository.CongeInclutInDate(date);
	}
}
	

