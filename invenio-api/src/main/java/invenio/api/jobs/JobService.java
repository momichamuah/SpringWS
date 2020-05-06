package invenio.api.jobs;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {
	@Autowired
	JobRepository jobRepository;
	
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

	public void addJob(JobModel Job) {
		jobRepository.save(Job);
	}
	
	public void updateJob(JobModel Job) {
		jobRepository.save(Job);
		
	}
	public void deleteJob(Long jobId) {
		jobRepository.deleteById(jobId);
	}
}
