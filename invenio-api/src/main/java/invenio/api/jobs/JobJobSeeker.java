package invenio.api.jobs;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class JobJobSeeker {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Long id;
	Long jsID;
	Long jobID;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJsID() {
		return jsID;
	}
	public void setJsID(Long jsID) {
		this.jsID = jsID;
	}
	public Long getJobID() {
		return jobID;
	}
	public void setJobID(Long jobID) {
		this.jobID = jobID;
	}

	
	
}
