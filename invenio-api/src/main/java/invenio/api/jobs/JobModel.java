package invenio.api.jobs;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.CascadeType;

import invenio.api.tagjob.TagJobModel;
import invenio.api.employer.EmployerModel;

@Entity
public class JobModel {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Long jobID;
	String jobTitle;
	String jobDescription;
	int tagMatch;
	public int getTagMatch() {
		return tagMatch;
	}

	public void setTagMatch(int tagMatch) {
		this.tagMatch = tagMatch;
	}
	
	@JsonManagedReference
	@OneToMany(mappedBy="job", cascade=CascadeType.ALL, orphanRemoval=true)
	List<TagJobModel> tags;
	
	@JsonBackReference
	@ManyToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name="empCode")
	private EmployerModel employer;

	public Long getJobID() {
		return jobID;
	}

	public void setJobID(Long jobID) {
		this.jobID = jobID;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public List<TagJobModel> getTags() {
		return tags;
	}

	public void setTags(List<TagJobModel> tags) {
		this.tags = tags;
	}

	public EmployerModel getEmployer() {
		return employer;
	}

	public void setEmployer(EmployerModel employer) {
		this.employer = employer;
	}
	
}
