package invenio.api.employer;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployerService {
	@Autowired
	private EmployerRepository repository;
	
	public List<EmployerModel> getAllEmployers(){
		List<EmployerModel> employers = new ArrayList<>(); 
		repository.findAll()
		.forEach(employers::add);
		return employers;
	}
	public Optional<EmployerModel> getEmployer(String code) {
		return repository.findById(code);
		
	}

	public void addEmployer(EmployerModel employer) {
		repository.save(employer);
	}
	
	public void updateEmployer(EmployerModel employer) {
		repository.save(employer);
		
	}
	public void deleteEmployer(String code) {
		repository.deleteById(code);
	}	
	
	public Optional<EmployerModel> getEmployerByEmail(String email) {
		List<EmployerModel> results = repository.findByEmail(email);
		if(results!=null && results.size()>0) {
			Optional<EmployerModel> result = Optional.of((EmployerModel) results.toArray()[0]);
			return (result) ;	
		}
		return null;
		
	}

	public boolean loginEmployer(EmployerModel employer) {
		String empCode = employer.getEmpCode();
		String password = employer.getPassword();
		Optional<EmployerModel> result= repository.findById(empCode);
		if(result.isPresent() && result.get().hashMatch(password)==true) {
			return true; 
		}
		else {
			return false;
		}
		
	
	}
}
