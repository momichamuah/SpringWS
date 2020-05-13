package invenio.api.jobseeker;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface JobSeekerRepository extends CrudRepository<JobSeekerModel, Long>{
	List<JobSeekerModel> findByEmail(String email);
	
//    @Modifying
//    @Transactional
//    @Query("delete from TagJobseekerModel e.JobSeekerModel.jsId = ?1")
//    void deleteUsingSingleQuery(Long jsId);


}
