package invenio.api.employer;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import invenio.api.utils.WebUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmployerController {
	@Autowired
	private EmployerService employerService;
	@Autowired
	private WebUtils webUtils;	
	
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
	
	@RequestMapping(method=RequestMethod.PUT, value="/employers")
	public void updateEmployer(@RequestBody EmployerModel employer) {
		employerService.updateEmployer(employer);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/employers/{code}")
	public void deleteEmployer(@PathVariable String code) {
		employerService.deleteEmployer(code);
	}	
	@RequestMapping(value="/employers/email/{email}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<EmployerModel>> getEmployerByEmail(@PathVariable String email) {
		Optional<EmployerModel> result = employerService.getEmployerByEmail(email);
		if(result!=null) {
			return new ResponseEntity<>( result, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
	}
	@RequestMapping(method=RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE,			
			value="/employers/forgetpassword")
	public ResponseEntity forgetpassword(@RequestBody EmployerModel model) {
		try {
			Optional<EmployerModel> result = employerService.getEmployerByEmail(model.getEmail());
			System.out.println(model.getEmail());
			if(result.isPresent()){
				EmployerModel usr=result.get();
				Random random = new Random();
				String token = String.format("%04d", random.nextInt(10000));			
				usr.setToken(token);
				employerService.updateEmployer(usr);
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
			value="/employers/resetpassword")	
	public ResponseEntity resetpassword(@RequestBody EmployerModel model) {
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
			
				Optional<EmployerModel> result = employerService.getEmployerByEmail(email);
				if(result.isPresent()){
					EmployerModel usr=result.get();
					if(token.equals(usr.getToken())) {
				    	usr.setToken("");
				    	usr.setPassword(password);
				    	employerService.updateEmployer(usr);
	
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
