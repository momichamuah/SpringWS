package invenio.api.tags;

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
public class TagController {
	@Autowired
	TagService service;
	
	@RequestMapping("/tags")
	public List<TagModel> getAllTags() {
		return service.getAllTags();
		
	}

	@RequestMapping(value="/tags/{tag}",produces=MediaType.APPLICATION_JSON_VALUE,method = RequestMethod.GET)	
	@ResponseBody
	public ResponseEntity<Optional<TagModel>> getTag(@PathVariable String tag) {
		return new ResponseEntity<>(service.getTag(tag),HttpStatus.OK);
		
		
	}
	@RequestMapping(method=RequestMethod.POST, value="/tags")
	public void addTag(@RequestBody TagModel Tag) {
		service.addTag(Tag);
		
	} 
	
	@RequestMapping(method=RequestMethod.PUT, value="/tags")
	public void updateTag(@RequestBody TagModel Tag) {
		service.updateTag(Tag);
		
	}		
	@RequestMapping(method=RequestMethod.DELETE, value="/tags/{tag}")
	public void deleteTag(@PathVariable String tag) {
		service.deleteTag(tag);
	}
}
