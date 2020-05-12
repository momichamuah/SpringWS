package invenio.api.jobs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import invenio.api.employer.EmployerModel;




public interface JobRepository extends CrudRepository<JobModel, Long>{
	@Query("FROM JobModel j WHERE j.employer.empCode=?1 ")
	List<JobModel> findByEmployer(String empCode);
	
	//@Query("FROM JobModel j join TagJobModel jm on jm.jobID=j.jobID join JobSeekerModel js on  jm.tag=js.tag and js.jsId=?1  group by jm.jobID having count(jm.jobID) >=j.tagMatch")
	@Query(value="SELECT j.*  FROM job_model j join tag_job_model jm on jm.jobid=j.jobid join tag_jobseeker_model js on  jm.tag=js.tag and js.js_id=:jsID  group by jm.jobid having count(jm.jobid) >0 order by count(jm.jobid) desc",  nativeQuery = true)
	//@Query(value="SELECT j.*  FROM job_model j",  nativeQuery = true)
	List<JobModel> findByJobSeeker(@Param("jsID") Long jsID );
	
	
}
