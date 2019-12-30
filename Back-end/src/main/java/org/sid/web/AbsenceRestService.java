package org.sid.web;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.sid.dao.AbsenceRespository;
import org.sid.dao.CongeRespository;
import org.sid.entities.Absence;
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
public class AbsenceRestService {
	@Autowired
	private AbsenceRespository absenceRespository;
	private CongeRespository congeRespository;

	@RequestMapping(value = "/absence", method = RequestMethod.GET)
	public List<Absence> getPersonnes() {
		return absenceRespository.findAll();
	}

	@RequestMapping(value = "/absence/{id}", method = RequestMethod.GET)
	public Optional<Absence> getPersonne(@PathVariable Long id) {
		return absenceRespository.findById(id);
	}

	@RequestMapping(value = "/absence", method = RequestMethod.POST)
	public Absence SaveContact(@RequestBody Absence c) {
		return absenceRespository.save(c);
	}

	@RequestMapping(value = "/absence/{id}", method = RequestMethod.DELETE)
	public boolean Supprimer(@PathVariable Long id) {
		absenceRespository.deleteById(id);
		return true;
	}

	@RequestMapping(value = "/absence/{id}", method = RequestMethod.PUT)
	public Absence modifier(@PathVariable Long id, @RequestBody Absence c) {
		c.setIdA(id);
		return absenceRespository.save(c);
	}

	@RequestMapping(value = "/insertAbsence", method = RequestMethod.GET)
	public void insert(@RequestParam(name = "date", defaultValue = "") Date date) {
		absenceRespository.AbsenceFromPresence(date);
	}

	@RequestMapping(value = "/generateAbsence", method = RequestMethod.GET)
	public void getAbsence(@RequestParam(name = "date") Date date) {
		List<personne> list = absenceRespository.getAbsence(date);
		/*SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date parsed=null;
		try {
			parsed = format.parse(date);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		java.sql.Date sql=new java.sql.Date(parsed.getTime());
		System.out.println("date sql"+sql);*/
		List<Conge> listc = absenceRespository.CongeInclutInDate(date);
		int nbr;
		for (int i = 0; i < list.size(); i++) {
			nbr=-1;
			personne p = new personne();
			p = list.get(i);
			for (int j = 0; j < listc.size(); j++) {
				Conge c = new Conge();
				c = listc.get(j);
				if (p.getMatricule() == c.getPersonne_id()) {
					nbr = nbr + 1;
					break;
				}
				
			}
			if(nbr==-1) {
				Absence a = new Absence();
				a.setPersonne_id(p.getMatricule());
				a.setDateAbsence(date);
				//absenceRespository.save(a);
				System.out.println(p.getMatricule());
			}
			//System.out.println(p.getNom());
		}
		/*
		 * list.forEach(p->{ int nbr=-1; listc.forEach(a->{
		 * if(p.getMatricule()==a.getPersonne_id()) { nbr=nbr+1; } }); if(nbr==-1) {
		 * Absence a = new Absence(); a.setPersonne_id(p.getMatricule());
		 * a.setDateAbsence(date);
		 * 
		 * absenceRespository.save(a); System.out.println(p.getMatricule()); } });
		 */
	}
	
	@RequestMapping(value = "/getAbsence", method = RequestMethod.GET)
	public List<Absence> getListAbsence(@RequestParam(name = "id") long id) {
		return absenceRespository.ListAbsence(id);
	}

	@RequestMapping(value = "/verfieAbsenceDate", method = RequestMethod.GET)
	public boolean VerfieAbdenceDate(@RequestParam(name = "date") Date Date) {
		// nombre d'absence inserer dans la table absence
		int nbr = absenceRespository.VerfierAbsenceDate(Date);
		System.out.println(nbr+"est le nombre donnes inserer dans absence");
		// nombre des absence calculé de la table presence
		int nbr1 = absenceRespository.NumberAbsence(Date);
		System.out.println(nbr1+"nombre calculé d'absence");
		if (nbr == 0 && nbr1 != 0)
			return true;
		else
			return false;
	}

	@RequestMapping(value = "/NombreAbsence", method = RequestMethod.GET)
	public int NombreAbsence(@RequestParam(name = "date") Date Date) {
		int nbr = absenceRespository.NumberAbsence(Date);
		return nbr;
	}
	@RequestMapping(value = "/AbsenceToday", method = RequestMethod.GET)
	public List<personne> listAbsence(@RequestParam(name = "date") Date date) {
		List<personne> list = absenceRespository.getAbsence(date);
		return list;
	}
}
/**
 * @RequestMapping(value = "/chercherabsences", method = RequestMethod.GET)
 *                       public Page<Absence> Chercher(
 * @RequestParam(name="mc",defaultValue="") String mc
 *                                          ,@RequestParam(name="page",defaultValue="0")
 *                                          int page
 *                                          ,@RequestParam(name="size",defaultValue="5")
 *                                          int size) {
 * 
 *                                          return
 *                                          absenceRespository.chercher("%"+mc+"%",
 *                                          new PageRequest(page, size)); }
 **/
