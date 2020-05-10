package invenio.api.jobseeker;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobSeekerService {
	@Autowired
	JobSeekerRepository repository;
	
	public List<JobSeekerModel> getAlljobSeekers(){
		List<JobSeekerModel> jobSeekers = new ArrayList<>(); 
		repository.findAll()
		.forEach(jobSeekers::add);
		return jobSeekers;
	}
	public Optional<JobSeekerModel> getJobSeeker(Long jsId) {
		return repository.findById(jsId);
		
	}

	public void addJobSeeker(JobSeekerModel JobSeeker) {
		repository.save(JobSeeker);
	}
	
	public void updateJobSeeker(JobSeekerModel JobSeeker) {
		repository.save(JobSeeker);
		
	}
	public void deleteJobSeeker(Long jsId) {
		repository.deleteById(jsId);
	}	
	
	public Optional<JobSeekerModel> getJobSeekerByEmail(String email) {
		List<JobSeekerModel> results = repository.findByEmail(email);
		if(results!=null && results.size()>0) {
			Optional<JobSeekerModel> result = Optional.of((JobSeekerModel) results.toArray()[0]);
			return (result) ;	
		}
		return null;
		
	}

	public boolean loginJobSeeker(JobSeekerModel JobSeeker) {
		String jsEmail = JobSeeker.getEmail();
		String password = JobSeeker.getPassword();
		Optional<JobSeekerModel> result= getJobSeekerByEmail(jsEmail);
		if(result.isPresent() && result.get().hashMatch(password)==true) {
			return true; 
		}
		else {
			return false;
		}
		
	
	}
}
