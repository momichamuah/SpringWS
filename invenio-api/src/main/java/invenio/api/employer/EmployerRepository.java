package invenio.api.employer;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EmployerRepository extends CrudRepository<EmployerModel, String>{
	List<EmployerModel> findByEmail(String email);
}
