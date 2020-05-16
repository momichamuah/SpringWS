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
	@Autowired
	JobJobSeekerRepository jjRepo;

	public List<JobModel> getAllJobs() {
		// return topics;
		List<JobModel> Jobs = new ArrayList<>();
		jobRepository.findAll().forEach(Jobs::add);
		return Jobs;
	}

	public Optional<JobModel> getJob(Long jobId) {
		return jobRepository.findById(jobId);

	}

	/*
	 * public List<JobModel> findByEmployer(String empCode) {
	 * System.out.println("empCode: " + empCode); Optional<EmployerModel> result =
	 * empRepo.findById(empCode); if(result.isPresent()) {
	 * System.out.println("result.isPresent"); return
	 * jobRepository.findByEmployer(result); } System.out.println("null"); return
	 * null; }
	 */
	public List<JobModel> findByEmployer(String empCode) {

		return jobRepository.findByEmployer(empCode);
	}

	public void addJob(JobModel Job) {
		jobRepository.save(Job);
	}
	public void addJobJobSeeker(JobJobSeeker jobJobSeeker) {
		jjRepo.save(jobJobSeeker);
	}
	public Optional<JobJobSeeker> getJobJobSeeker(Long jsId, Long jobId) {
		Optional<List<JobJobSeeker>> result = jjRepo.getJJRecord(jsId, jobId);
		if(result.isPresent() && result.get().size()>0) {
			
			return Optional.of(result.get().get(0));
		}
		return null;
	}

	public void updateJob(JobModel Job) {
		jobRepository.save(Job);

	}

	public void deleteJob(Long jobId) {
		jobRepository.deleteById(jobId);
	}

	public List<JobModel> findByJobSeeker(Long jsID) {
		List<JobModel> result = jobRepository.findByJobSeeker(jsID);
		/*for(JobModel j:result) {
			j.isJobAppliedBySeeker= jjRepo.getJJRecord(jsID, j.getJobID()).isPresent();
		}*/
		return result;
	}
}
