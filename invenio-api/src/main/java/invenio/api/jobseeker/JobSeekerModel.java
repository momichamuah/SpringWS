package invenio.api.jobseeker;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import invenio.api.tagjobseeker.TagJobseekerModel;
import invenio.api.utils.PasswordHash;

@Entity
public class JobSeekerModel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Long jsId;
	String firstName;
	String lastName;
	@Column(unique=true)
	String email;
	String phone;
	String image;
	String password;
	String hashedPassword;
	String linkedInUrl;
	String gitHubUrl;
	String token;
	String information;
	
	@JsonManagedReference
	@OneToMany(mappedBy="jobseeker", cascade=CascadeType.ALL, orphanRemoval = true)
	List<TagJobseekerModel> tags;

	public Long getJsId() {
		return jsId;
	}

	public void setJsId(Long jsId) {
		this.jsId = jsId;
	}

	public String getFirstName() {
		return firstName;
	}
	public String getFirstLastName() {
		return firstName + " " + lastName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
		this.hashedPassword = PasswordHash.toHexString(password);
		System.out.println(hashedPassword);
	}
	public String getHashedPassword() {
		return this.hashedPassword;
	}
	public boolean hashMatch(String value) {
		return this.hashedPassword.equals(PasswordHash.toHexString(value));
	}
	
	public String getLinkedInUrl() {
		return linkedInUrl;
	}

	public void setLinkedInUrl(String linkedInUrl) {
		this.linkedInUrl = linkedInUrl;
	}

	public String getGitHubUrl() {
		return gitHubUrl;
	}

	public void setGitHubUrl(String gitHubUrl) {
		this.gitHubUrl = gitHubUrl;
	}

	public List<TagJobseekerModel> getTags() {
		return tags;
	}

	public void setTags(List<TagJobseekerModel> tags) {
		this.tags = tags;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}
	
}
