package invenio.api.tags;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import invenio.api.employer.EmployerModel;
import invenio.api.jobs.JobModel;

@Entity
public class TagModel {
	@Id
	@Column(length=50)
	String tag;
	String description;
	
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
	@Override
	public String toString() {
		return "TagModel [tag=" + tag + ", description=" + description + "]";
	}
	public TagModel(String tag, String description) {
		super();
		this.tag = tag;
		this.description = description;
	}
	public TagModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
