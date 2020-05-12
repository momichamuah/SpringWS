package invenio.api.jobs;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import invenio.api.employer.EmployerModel;
import invenio.api.employer.EmployerService;
import invenio.api.jobseeker.JobSeekerModel;
import invenio.api.jobseeker.JobSeekerService;
import invenio.api.utils.WebUtils;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class JobController {
	@Autowired
	JobService service;
	@Autowired
	private WebUtils webUtils;	
	@Autowired
	private EmployerService empservice;
	@Autowired
	private JobSeekerService jsservice;
	
	@RequestMapping("/jobs")
	public List<JobModel> getAllJobs() {
		return service.getAllJobs();
		
	}
	
	@RequestMapping(value="/jobs/employer/{empCode}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public List<JobModel> findByEmployer(@PathVariable String empCode) {
		System.out.println("controller empCode:" + empCode);
		return service.findByEmployer(empCode);
		
	}
	@RequestMapping(value="/jobs/jobseeker/{jsID}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public List<JobModel> findByJobSeeker(@PathVariable Long jsID) {
		System.out.println("controller jsID:" + jsID);
		return service.findByJobSeeker(jsID);
		
	}
	
	@RequestMapping(value="/jobs/{JobId}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<JobModel>> getJob(@PathVariable Long JobId) {
		return new ResponseEntity<>(service.getJob(JobId),HttpStatus.OK);
		
		
	}
	@RequestMapping(method=RequestMethod.POST, value="/jobs")
	public void addJob(@RequestBody JobModel Job) {
		service.addJob(Job);
		
	} 
	@RequestMapping(method=RequestMethod.POST, value="/jobs/jobseeker")
	public void addJob(@RequestBody JobJobSeeker jjSeeker) {
		String to="";
		String msg="";
		String subject="";
		service.addJobJobSeeker(jjSeeker);
		Optional<JobModel> job = service.getJob(jjSeeker.getJobID());
		if(job.isPresent()) {
			Optional<EmployerModel> empModel = empservice.getEmployer(job.get().getEmployer().getEmpCode());
			if(empModel.isPresent()) {
				to = empModel.get().getEmail();
				Optional<JobSeekerModel> jsModel = jsservice.getJobSeeker(jjSeeker.getJsID());
				if(jsModel.isPresent()) {
					subject = jsModel.get().getFirstLastName() + " is interested for Job: " + jjSeeker.getJsID();
					msg = "Hello " + empModel.get().getEmpName() + "," +  System.lineSeparator() +  System.lineSeparator() +
							jsModel.get().getFirstLastName() + " has shown interest for the job " + jsModel.get().getJsId() + ":" + job.get().getJobTitle() + System.lineSeparator() +
							"You may reach the candidate by " + jsModel.get().getEmail();
					webUtils.sendMail(to, msg, subject);
							
				}
			}
		}
		
	} 
	
	@RequestMapping(value="/jobs/jobseeker/{jsID}/{jobID}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<JobJobSeeker>> findByJobSeeker(@PathVariable Long jsID, @PathVariable Long jobID) {
		System.out.println("controller jsId:" + jsID);
		Optional<JobJobSeeker> jjseeker = service.getJobJobSeeker(jsID, jobID);
		if( jjseeker.isPresent()) {
			return new ResponseEntity<>( jjseeker, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/jobs")
	public void updateJob(@RequestBody JobModel Job) {
		service.updateJob(Job);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/jobs/{Job}")
	public void deleteJob(@PathVariable Long jobId) {
		service.deleteJob(jobId);
	}
}
