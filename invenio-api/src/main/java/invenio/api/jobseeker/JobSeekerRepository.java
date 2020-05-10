package invenio.api.jobseeker;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface JobSeekerRepository extends CrudRepository<JobSeekerModel, Long>{
	List<JobSeekerModel> findByEmail(String email);
}
