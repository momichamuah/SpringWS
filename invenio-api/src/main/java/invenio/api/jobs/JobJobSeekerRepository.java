package invenio.api.jobs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface JobJobSeekerRepository extends CrudRepository<JobJobSeeker, Long>{
	@Query("FROM JobJobSeeker WHERE jsID=?1 AND jobID=?2")
	Optional<List<JobJobSeeker>> getJJRecord(Long jsID, Long jobID);
}
