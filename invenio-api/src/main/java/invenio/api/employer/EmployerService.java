package invenio.api.employer;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployerService {
	@Autowired
	private EmployerRepository employerRepository;
	
	public List<EmployerModel> getAllEmployers(){
		//return topics;
		List<EmployerModel> employers = new ArrayList<>(); 
		employerRepository.findAll()
		.forEach(employers::add);
		return employers;
	}
	public Optional<EmployerModel> getEmployer(String code) {
		return employerRepository.findById(code);
		
	}

	public void addEmployer(EmployerModel employer) {
		employerRepository.save(employer);
	}
	
	public void updateEmployer(EmployerModel employer) {
		employerRepository.save(employer);
		
	}
	public void deleteEmployer(String code) {
		employerRepository.deleteById(code);
	}	
	
	public Optional<EmployerModel> getEmployerByEmail(String email) {
		List<EmployerModel> results = employerRepository.findByEmail(email);
		if(results!=null && results.size()>0) {
			Optional<EmployerModel> result = Optional.of((EmployerModel) results.toArray()[0]);
			return (result) ;	
		}
		return null;
		
	}

	public boolean loginEmployer(EmployerModel employer) {
		String empCode = employer.getEmpCode();
		String password = employer.getPassword();
		Optional<EmployerModel> result= employerRepository.findById(empCode);
		if(result.isPresent() && result.get().hashMatch(password)==true) {
			return true; 
		}
		else {
			return false;
		}
		
	
	}
}
