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

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class JobController {
	@Autowired
	JobService service;
	
	@RequestMapping("/jobs")
	public List<JobModel> getAllJobs() {
		return service.getAllJobs();
		
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
	
	@RequestMapping(method=RequestMethod.PUT, value="/jobs")
	public void updateJob(@RequestBody JobModel Job) {
		service.updateJob(Job);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/jobs/{Job}")
	public void deleteJob(@PathVariable Long jobId) {
		service.deleteJob(jobId);
	}
}
