package org.sid;

import javax.annotation.Resource;

import org.sid.dao.PersonneRespository;
import org.sid.uploadfiles.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RhEnsaApplication implements CommandLineRunner {

	@Resource
	StorageService storageService;

	@Autowired
	private PersonneRespository PersonneRepository;

	public static void main(String[] args) {
		SpringApplication.run(RhEnsaApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		storageService.deleteAll();
		storageService.init();

		/**
		 * DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		 * PersonneRepository.save(new personne("Fati", "laghfiri",
		 * df.parse("25/10/1997"), "fati@gmail.com", 652184460, "zack.jpg", "CIN123",
		 * "casablanca", "Homme", "Informatique", "25/10/1997", "casablanca", "inge"));
		 * PersonneRepository.save(new personne("Kawtar", "Mouyassir",
		 * df.parse("25/10/1997"), "koki@gmail.com", 652184460, "zack.jpg", "CIN123",
		 * "eljadida", "Homme", "Informatique", "25/10/1997", "eljadida", "inge"));
		 */

		PersonneRepository.findAll().forEach(c -> {
			System.out.println(c.getNom());
		});
	}
}
