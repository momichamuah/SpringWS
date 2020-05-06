package invenio.api.tags;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TagService {
	@Autowired
	private TagRepository repository;
	public List<TagModel> getAllTags(){
		//return topics;
		List<TagModel> tags = new ArrayList<>(); 
		repository.findAll()
		.forEach(tags::add);
		return tags;
	}
	public Optional<TagModel> getTag(String code) {
		return repository.findById(code);
		
	}

	public void addTag(TagModel Tag) {
		repository.save(Tag);
	}
	
	public void updateTag(TagModel Tag) {
		repository.save(Tag);
		
	}
	public void deleteTag(String code) {
		repository.deleteById(code);
	}
}
