package invenio.api.jobs;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

	@OneToMany(mappedBy="job", cascade=CascadeType.ALL)
	List<TagJobModel> tags;
	
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
