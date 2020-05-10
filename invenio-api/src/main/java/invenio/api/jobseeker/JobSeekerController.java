package invenio.api.jobseeker;

import java.util.List;
import java.util.Optional;
import java.util.Random;

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

import invenio.api.utils.WebUtils;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class JobSeekerController {
	@Autowired
	private JobSeekerService service;
	@Autowired
	private WebUtils webUtils;	
	
	@RequestMapping("/jobSeekers")
	public List<JobSeekerModel> getAlljobSeekers() {
		return service.getAlljobSeekers();
		
	}
	
	@RequestMapping(value="/jobseekers/{id}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<JobSeekerModel>> getJobSeeker(@PathVariable Long id) {
		return new ResponseEntity<>(service.getJobSeeker(id),HttpStatus.OK);
		
		
	}
	@RequestMapping(method=RequestMethod.POST, value="/jobseekers")
	public void addJobSeeker(@RequestBody JobSeekerModel JobSeeker) {
		service.addJobSeeker(JobSeeker);
		
	} 
	
	@RequestMapping(method=RequestMethod.PUT, value="/jobseekers")
	public void updateJobSeeker(@RequestBody JobSeekerModel JobSeeker) {
		service.updateJobSeeker(JobSeeker);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/jobseekers/{id}")
	public void deleteJobSeeker(@PathVariable Long id) {
		service.deleteJobSeeker(id);
	}	
	@RequestMapping(value="/jobseekers/email/{email}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<JobSeekerModel>> getJobSeekerByEmail(@PathVariable String email) {
		Optional<JobSeekerModel> result = service.getJobSeekerByEmail(email);
		if(result!=null) {
			return new ResponseEntity<>( result, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
	}
	@RequestMapping(method=RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,			
			value="/jobseekers/forgetpassword")
	public ResponseEntity forgetpassword(@RequestBody JobSeekerModel model) {
		try {
			Optional<JobSeekerModel> result = service.getJobSeekerByEmail(model.getEmail());
			System.out.println(model.getEmail());
			if(result.isPresent()){
				JobSeekerModel usr=result.get();
				Random random = new Random();
				String token = String.format("%04d", random.nextInt(10000));			
				usr.setToken(token);
				service.updateJobSeeker(usr);
				webUtils.sendMail(usr.getEmail(), "Please use this token to reset your password "+token, "Password Reset");
			}else {
				 //model.addAttribute("error", "No user account found with "+model.getEmail()); 
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);		
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}	
	@RequestMapping(method=RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,			
			value="/jobseekers/resetpassword")	
	public ResponseEntity resetpassword(@RequestBody JobSeekerModel model) {
		try {
			//String passwordRegex ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$";
			String password = model.getPassword();
			String token = model.getToken();
			String email = model.getEmail();
			System.out.println(model.getPassword());
			System.out.println(model.getToken());
			//!password.matches(passwordRegex)
			if (password!=null && password.length()>0 &&  token!=null && token.length()>0 && email!=null && email.length()>0) {
				    //model.addAttribute("error", "Password should be at least 8 characters, lower case, upper case and a special character."); 
					//model.addAttribute("email", email); 
			
				Optional<JobSeekerModel> result = service.getJobSeekerByEmail(email);
				if(result.isPresent()){
					JobSeekerModel usr=result.get();
					if(token.equals(usr.getToken())) {
				    	usr.setToken("");
				    	usr.setPassword(password);
				    	service.updateJobSeeker(usr);
	
						//red.addFlashAttribute("success", "Password reset success thanks, please contact admin if you did not perform this change");
						//webUtils.sendMail(email, "Password reset success thanks, please contact admin if you did not perform this change", "Password Reset");
						//return "redirect:profile";
					}
				}else {
				//model.addAttribute("error", "Invalid token"); 
				//model.addAttribute("email", email); 
					return new ResponseEntity<>("Invalid email",HttpStatus.UNAUTHORIZED);	
				
				}
			}
			else {
				return new ResponseEntity<>("invalid token or password or email",HttpStatus.UNAUTHORIZED);		  
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>("Exception",HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/jobseekers/login", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,
			method = RequestMethod.POST)
			public ResponseEntity<Optional<JobSeekerModel>>  loginJobSeeker(@RequestBody JobSeekerModel JobSeeker) {
			Optional<JobSeekerModel> result = Optional.ofNullable(JobSeeker);
			if(service.loginJobSeeker(JobSeeker)) {
				Optional<JobSeekerModel> obj =  service.getJobSeekerByEmail(result.get().getEmail());
				return new ResponseEntity<>(obj, HttpStatus.OK); 
			}
			else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
	}

	
	
}
