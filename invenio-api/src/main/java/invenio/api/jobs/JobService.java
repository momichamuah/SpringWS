package invenio.api.jobs;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import invenio.api.employer.EmployerModel;
import invenio.api.employer.EmployerRepository;

@Service
public class JobService {
	@Autowired
	JobRepository jobRepository;
	@Autowired
	EmployerRepository empRepo;
	
	public List<JobModel> getAllJobs(){
		//return topics;
		List<JobModel> Jobs = new ArrayList<>(); 
		jobRepository.findAll()
		.forEach(Jobs::add);
		return Jobs;
	}
	public Optional<JobModel> getJob(Long jobId) {
		return jobRepository.findById(jobId);
		
	}
	/*public List<JobModel> findByEmployer(String empCode) {
		System.out.println("empCode: " + empCode);
		Optional<EmployerModel> result = empRepo.findById(empCode);
		if(result.isPresent()) {
			System.out.println("result.isPresent");
			return jobRepository.findByEmployer(result);
		}
		System.out.println("null");
		return null;
	}*/
	public List<JobModel> findByEmployer(String empCode) {

			return jobRepository.findByEmployer(empCode);
	}
	public void addJob(JobModel Job) {
		jobRepository.save(Job);
	}
	
	public void updateJob(JobModel Job) {
		jobRepository.save(Job);
		
	}
	public void deleteJob(Long jobId) {
		jobRepository.deleteById(jobId);
	}
	public List<JobModel> findByJobSeeker(Long jsID) {

		return jobRepository.findByJobSeeker(jsID);
}
}
