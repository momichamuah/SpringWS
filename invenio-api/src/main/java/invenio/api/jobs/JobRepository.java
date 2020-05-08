package invenio.api.jobs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import invenio.api.employer.EmployerModel;




public interface JobRepository extends CrudRepository<JobModel, Long>{
	@Query("FROM JobModel j WHERE j.employer.empCode=?1 ")
	List<JobModel> findByEmployer(String empCode);
	
	
}
