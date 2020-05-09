package invenio.api.tagjob;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import invenio.api.jobs.JobModel;
import invenio.api.tags.TagModel;

@Entity
public class TagJobModel {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Long id;
	String tag;
	String description;
	
	@JsonBackReference
	@ManyToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name="jobID")
	private JobModel job;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public JobModel getJob() {
		return job;
	}

	public void setJob(JobModel job) {
		this.job = job;
	}


}
