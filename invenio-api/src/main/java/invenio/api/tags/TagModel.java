package invenio.api.tags;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonInclude;


@Entity
public class TagModel {
	@Id
	@Column(length=50)
	String tag;
	String description;
	@JsonInclude()
	@Transient
	String category="wip";
	

	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
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
