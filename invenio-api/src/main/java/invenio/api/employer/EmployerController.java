package invenio.api.employer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmployerController {
	@Autowired
	private EmployerService employerService;
	
	@RequestMapping("/employers")
	public List<EmployerModel> getAllEmployers() {
		return employerService.getAllEmployers();
		
	}
	
	@RequestMapping(value="/employers/{code}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<EmployerModel>> getEmployer(@PathVariable String code) {
		return new ResponseEntity<>(employerService.getEmployer(code),HttpStatus.OK);
		
		
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/employers")
	public void addEmployer(@RequestBody EmployerModel employer) {
		employerService.addEmployer(employer);
		
	} 
	
	@RequestMapping(method=RequestMethod.PUT, value="/employers/{code}")
	public void updateEmployer(@RequestBody EmployerModel employer, @PathVariable String code) {
		employerService.updateEmployer(employer,code);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/employers/{code}")
	public void deleteEmployer(@PathVariable String code) {
		employerService.deleteEmployer(code);
	}
	
	@RequestMapping(value = "/employers/login", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
			public ResponseEntity<Optional<EmployerModel>>  loginEmployer(@RequestBody EmployerModel employer) {
			Optional<EmployerModel> result = Optional.ofNullable(employer);
			if(employerService.loginEmployer(employer)) {
				return new ResponseEntity<>(result, HttpStatus.OK); 
			}
			else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
	}
	
}
